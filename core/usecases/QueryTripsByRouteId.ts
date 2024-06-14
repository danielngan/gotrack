import {Trip} from "../models/Trip";
import {UseCase, UseCaseType} from "./UseCase";

export class QueryTripsByRouteId extends UseCase<{
    routeId: string;
}, Trip[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}