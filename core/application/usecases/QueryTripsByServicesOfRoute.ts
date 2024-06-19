import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";
import {Route} from "../../domain/entities/Route";
import {StopTime} from "../../domain/entities/StopTime";
import {Trip} from "../../domain/entities/Trip";

export type QueryTripsByServicesOfRouteInput = Pick<Route, "route_id"> & Partial<Pick<Trip, "direction_id">>

export type QueryTripsByServicesOfRouteOutput = Route & {
    services: Array<Pick<Trip, "service_id"> & {
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
export class QueryTripsByServicesOfRoute extends UseCase<QueryTripsByServicesOfRouteInput, QueryTripsByServicesOfRouteOutput> {

    constructor() {
        super(UseCaseType.QUERY);
    }
}
