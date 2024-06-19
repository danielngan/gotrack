import {UseCase, UseCaseType} from "./UseCase";
import {Route} from "../../domain/entities/Route";
import {Stop} from "../../domain/entities/Stop";
import {StopTime} from "../../domain/entities/StopTime";
import {Trip} from "../../domain/entities/Trip";

/**
 * Query routes by stop use case.
 */
export class QueryRoutesByStop extends UseCase<Pick<Stop, "stop_id">,
    {
        routes: Array<Route & {
            trips: Array<Trip & StopTime>
        }>,
    } & Stop | undefined > {

    constructor() {
        super(UseCaseType.QUERY);
    }
}