import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";
import {Route} from "../../domain/entities/Route";
import {StopTime} from "../../domain/entities/StopTime";
import {Trip} from "../../domain/entities/Trip";
import {Calendar} from "../../domain/entities/Calendar";
import {CalendarDate} from "../../domain/entities/CalendarDate";

export type QueryTripsGroupedByServicesInput = Pick<Route, "route_id"> & Partial<Pick<Trip, "direction_id">>

export type QueryTripsGroupedByServicesOutput = Route & {
    services: Array<Pick<Trip, "service_id"> & {
        calendar?: Omit<Calendar, "service_id">,
        calendar_dates: Array<Omit<CalendarDate, "service_id">>,
        trips: Array<Omit<Trip, "route_id" | "service_id"> & {
            start_time: string,
            end_time: string,
            stops: Array<Omit<StopTime, "trip_id"> & Stop>
        }>
    }>
} | undefined

/**
 * A use case to query stops by route. This use case returns all stops visited by a route in the order they are visited.
 * For each stop, the use case also returns the trips of the route that visit the stop together with the stop time.
 */
export class QueryTripsGroupedByServices extends UseCase<QueryTripsGroupedByServicesInput, QueryTripsGroupedByServicesOutput> {

    constructor() {
        super(UseCaseType.QUERY);
    }
}
