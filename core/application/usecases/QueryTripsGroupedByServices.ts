import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";
import {Route} from "../../domain/entities/Route";
import {StopTime} from "../../domain/entities/StopTime";
import {Trip} from "../../domain/entities/Trip";
import {Calendar} from "../../domain/entities/Calendar";
import {CalendarDate} from "../../domain/entities/CalendarDate";

/**
 * The input of the use case QueryTripsGroupedByServices. It contains the route id,
 * and optionally the service id and direction id. If the service id is not provided,
 * all services are considered. If the direction id is not provided, all directions
 * are considered.
 */
export type QueryTripsGroupedByServicesInput =
    Pick<Trip, "route_id"> & Partial<Pick<Trip, "service_id" | "direction_id">>

/**
 * The output of the use case QueryTripsGroupedByServices. It contains the route and
 * an array of services. Each service includes the calendar, the calendar dates, and
 * an array of trips. Each trip includes the start and end times, and the stops it
 * travels through. Each stop includes also the stop time.
 *
 * The services are sorted by service id. The trips are sorted by start time.
 * The start time is the arrival time of the first stop, and the end time is the
 * arrival time of the last stop.
 */
export type QueryTripsGroupedByServicesOutput = Route & {
    services: Array<{
        service_id: Trip["service_id"],
        calendar?: Calendar,
        calendar_dates: Array<CalendarDate>,
        trips: Array<Trip & {
            start_time: string,
            end_time: string,
            stops: Array<Stop & StopTime>
        }>
    }>
} | undefined

/**
 * A use case that queries trips grouped by services for a given route id, and
 * optionally a service id and direction id. Each trip includes its start and end
 * times, and the stops it travels through. Each stop includes also the stop time.
 */
export class QueryTripsGroupedByServices
    extends UseCase<QueryTripsGroupedByServicesInput, QueryTripsGroupedByServicesOutput> {

    constructor() {
        super(UseCaseType.QUERY);
    }
}
