import {MongoDBRouteRepository, RouteModel} from "./MongoDBRouteRepository";
import {MongoDBStopRepository, StopModel} from "./MongoDBStopRepository";
import {MongoDBStopTimeRepository, StopTimeModel} from "./MongoDBStopTimeRepository";
import {MongoDBTripRepository, TripModel} from "./MongoDBTripRepository";
import {Repositories} from "../../application/repositories/Repositories";
import {QueryTripsGroupedByServicesInput} from "../../../core/application/usecases/QueryTripsGroupedByServices";
import {QueryTripsGroupedByServicesOutput} from "../../../core/application/usecases/QueryTripsGroupedByServices";
import {Route} from "../../../core/domain/entities/Route";
import {CalendarModel, MongoDBCalendarRepository} from "./MongoDBCalendarRepository";
import {CalendarDateModel, CalendarDateSchema, MongoDBCalendarDateRepository} from "./MongoDBCalendarDateRepository";
import {MongoDBShapeRepository, ShapeModel} from "./MongoDBShapeRepository";
import {applyMixins} from "../../../core/utils/Utils";
import {toObject} from "./MongoDBUtils";

export interface MongoDBRepositories
    extends
        MongoDBCalendarRepository,
        MongoDBCalendarDateRepository,
        MongoDBRouteRepository,
        MongoDBShapeRepository,
        MongoDBStopRepository,
        MongoDBStopTimeRepository,
        MongoDBTripRepository,
        Repositories {
}

export class MongoDBRepositories implements Repositories {

    /**
     * Implements the use case QueryTripsGroupedByServices. Please, refer to the
     * core/application/usecases/QueryTripsGroupedByServices file for more information.
     * @param input The input of the use case QueryTripsGroupedByServices.
     * @returns The output of the use case QueryTripsGroupedByServices.
     */
    async queryTripsGroupedByServices(input: QueryTripsGroupedByServicesInput): Promise<QueryTripsGroupedByServicesOutput> {
        const route: Route | undefined = await RouteModel.findOne({route_id: input.route_id}).exec().then(toObject);
        // If the route does not exist, return undefined.
        if (route === null) {
            return undefined
        }
        const direction_id: number | undefined = input.direction_id
        const service_id: string | undefined = input.service_id;

        // Query the trips grouped by services using the aggregation pipeline starting
        // from the trips collection.
        const services = await TripModel.aggregate([
            {
                $match: {
                    // Filter by route id.
                    route_id: input.route_id,

                    // If the service id is provided, filter by service id. Otherwise, consider all services.
                    service_id: service_id !== undefined ? service_id : { $exists: true },

                    // If the direction id is provided, filter by direction id. Otherwise, consider all directions.
                    direction_id: direction_id !== undefined ? direction_id : { $exists: true }
                }
            },
            {
                // Join the trips with the stop times collection.
                $lookup: {
                    from: "stop_times",
                    localField: "trip_id",
                    foreignField: "trip_id",
                    as: "_stop_times",
                    pipeline: [
                        {
                            // Join with the stops collection.
                            $lookup: {
                                from: "stops",
                                localField: "stop_id",
                                foreignField: "stop_id",
                                pipeline: [
                                    {
                                        $project: {_id: 0}
                                    }
                                ],
                                as: "_stops",
                            }
                        },
                        {
                            // Merge the stop time (the $ROOT) with the stop.
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: [ "$$ROOT", { $arrayElemAt: ["$_stops", 0] }  ]
                                }
                            }
                        },
                        {
                            // Remove the stops array and the _id field.
                            $project: {_stops: 0, _id: 0}
                        },
                        {
                            // Sort the stops by stop sequence.
                            $sort: { stop_sequence: 1 }
                        },
                    ],
                },
            },
            {   // Add the start and end times of the trip.
                $set: {
                    // Set the start time as the arrival time of the first stop.
                    start_time: {
                        $getField: {
                            input: { $arrayElemAt: ["$_stop_times", 0] },
                            field: "arrival_time"
                        }
                    },
                    // Set the end time as the arrival time of the last stop.
                    end_time: {
                        $getField: {
                            input: { $arrayElemAt: ["$_stop_times", -1] },
                            field: "arrival_time"
                        }
                    },
                    stops: "$_stop_times"
                }
            },
            {
                // Remove the _stop_times field and the _id field.
                $project: {_id: 0, _stop_times: 0}
            },
            {
                // Group the trips by service id.
                $group: {
                    _id: {
                        service_id: "$service_id"
                    },
                    // Push each trip into an array
                    trips: {
                        $push: "$$ROOT"
                    },
                }
            },
            {
                // Join with the calendar collection.
                $lookup: {
                    from: "calendar",
                    localField: "_id.service_id",
                    foreignField: "service_id",
                    pipeline: [
                        {
                            $project: {_id: 0,}
                        }
                    ],
                    as: "_calendars",
                }
            },
            {
                // Join with the calendar dates collection.
                $lookup: {
                    from: "calendar_dates",
                    localField: "_id.service_id",
                    foreignField: "service_id",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                            }
                        }
                    ],
                    as: "_calendar_dates",
                }
            },
            {
                // Project the final output with the service id, the calendar, the calendar dates, and the trips.
                $project: {
                    service_id: "$_id.service_id",
                    calendar: {$arrayElemAt: ["$_calendars", 0]},
                    calendar_dates: "$_calendar_dates",
                    trips: {
                        // Sort the trips by the trips' start time which is the arrival time of the first stop.
                        $sortArray: {
                            input: "$trips",
                            sortBy: {"start_time": 1}
                        }
                    },
                },
            },
            {
                // Remove the _calendars and _calendar_dates fields and the _id field.
                $project: {
                    _id: 0,
                    _calendars: 0,
                    _calendar_dates: 0
                }
            },
            {
                // Finally sort the services by service id.
                $sort: { service_id: 1 }
            }
        ]).exec()

        // Combine the route with the services and return the output.
        return {
            ...route,
            services: services
        } as QueryTripsGroupedByServicesOutput;
    }

    async deleteAll(): Promise<void> {
        await Promise.all([
            this.deleteAllCalendars(),
            this.deleteAllCalendarDates(),
            this.deleteAllRoutes(),
            this.deleteAllShapes(),
            this.deleteAllStops(),
            this.deleteAllStopTimes(),
            this.deleteAllTrips(),
        ]);
    }

    async ensureIndexes(): Promise<void> {
        await Promise.all([
            CalendarModel.ensureIndexes({background: false}),
            CalendarDateModel.ensureIndexes({background: false}),
            RouteModel.ensureIndexes({background: false}),
            ShapeModel.ensureIndexes({background: false}),
            StopModel.ensureIndexes({background: false}),
            StopTimeModel.ensureIndexes({background: false}),
            TripModel.ensureIndexes({background: false})
        ]);
    }
}

applyMixins(MongoDBRepositories, [
    MongoDBCalendarRepository,
    MongoDBCalendarDateRepository,
    MongoDBRouteRepository,
    MongoDBShapeRepository,
    MongoDBStopRepository,
    MongoDBStopTimeRepository,
    MongoDBTripRepository
]);
