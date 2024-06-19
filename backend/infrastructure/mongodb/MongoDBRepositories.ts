import {MongoDBRouteRepository, RouteModel} from "./MongoDBRouteRepository";
import {MongoDBStopRepository, StopModel} from "./MongoDBStopRepository";
import {MongoDBStopTimeRepository, StopTimeModel} from "./MongoDBStopTimeRepository";
import {MongoDBTripRepository, TripModel} from "./MongoDBTripRepository";
import {Repositories} from "../../application/repositories/Repositories";
import {applyMixins} from "../../../core/utils/Utils";
import {Trip} from "../../../core/domain/entities/Trip";
import {StopTime} from "../../../core/domain/entities/StopTime";
import {Stop} from "../../../core/domain/entities/Stop";
import {QueryTripsByServicesOfRouteInput, QueryTripsByServicesOfRouteOutput} from "../../../core/application/usecases/QueryTripsByServicesOfRoute";
import {toObject} from "./MongoDBUtils";
import {Route} from "../../../core/domain/entities/Route";

export interface MongoDBRepositories
    extends
        MongoDBRouteRepository,
        MongoDBStopRepository,
        MongoDBStopTimeRepository,
        MongoDBTripRepository,
        Repositories {
}

export class MongoDBRepositories implements Repositories {

    async queryTripsByServicesOfRoute(input: QueryTripsByServicesOfRouteInput): Promise<QueryTripsByServicesOfRouteOutput> {
        const route: Route | undefined = await RouteModel.findOne({route_id: input.route_id}).exec().then(toObject);
        if (route === null) {
            return undefined
        }
        const direction_ids: number[] = input.direction_id !== undefined ? [input.direction_id] : [0, 1];
        const services = await TripModel.aggregate([
            {
                $match: {
                    route_id: input.route_id,
                    direction_id: { $in: direction_ids }
                }
            },
            {
                $lookup: {
                    from: "stop_times",
                    localField: "trip_id",
                    foreignField: "trip_id",
                    as: "stop_times",
                    pipeline: [
                        {
                            $lookup: {
                                from: "stops",
                                localField: "stop_id",
                                foreignField: "stop_id",
                                as: "stops",
                            }
                        },
                        {
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: [ "$$ROOT", { $arrayElemAt: ["$stops", 0] } ]
                                }
                            }
                        },
                        {
                            $project: {
                                stops: 0,
                                trip_id: 0,
                                _id: 0

                            }
                        },
                        {
                            $sort: { stop_sequence: 1 }
                        },
                    ],
                },
            },
            {   $set: {
                    start_time: {
                        $getField: {
                            input: { $arrayElemAt: ["$stop_times", 0] },
                            field: "arrival_time"
                        }
                    },
                    end_time: {
                        $getField: {
                            input: { $arrayElemAt: ["$stop_times", -1] },
                            field: "arrival_time"
                        }
                    },
                    stops: "$stop_times"
                }
            },
            {
                $unset: ["_id", "route_id", "stop_times"]
            },
            {
                $group: {
                    _id: "$service_id",
                    trips: {
                        $push: {
                            $unsetField: {
                                input: "$$ROOT",
                                field: "service_id"
                            }
                        },
                    },
                }
            },
            {
                $project: {
                    service_id: "$_id",
                    trips: {
                        $sortArray: {
                            input: "$trips",
                            sortBy: { "start_time": 1 }
                        }
                    },
                    _id: 0
                }
            },

            {
                $sort: { service_id: 1 }
            }
        ]).exec()
        return {...route, services: services} as QueryTripsByServicesOfRouteOutput;
    }

    async clearAll(): Promise<void> {
        await Promise.all([
            this.clearAllRoutes(),
            this.clearAllStops(),
            this.clearAllStopTimes(),
            this.clearAllTrips()
        ]);
    }

    async ensureIndexes(): Promise<void> {
        await Promise.all([
            RouteModel.ensureIndexes({background: false}),
            StopModel.ensureIndexes({background: false}),
            StopTimeModel.ensureIndexes({background: false}),
            TripModel.ensureIndexes({background: false})
        ]);
    }
}

applyMixins(MongoDBRepositories, [
    MongoDBRouteRepository,
    MongoDBStopRepository,
    MongoDBStopTimeRepository,
    MongoDBTripRepository
]);
