import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";
import {Trip} from "../../domain/entities/Trip";
import {StopTime} from "../../domain/entities/StopTime";
import {Route} from "../../domain/entities/Route";

export class QueryStopsByTrip extends UseCase<Pick<Trip, "trip_id">,
    {
        stops: Array<Stop & StopTime>
    } & Trip & Route | undefined> {

    constructor() {
        super(UseCaseType.QUERY);
    }
}