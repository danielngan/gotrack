import {Trip} from "../../domain/entities/Trip";
import {UseCase, UseCaseType} from "./UseCase";

export class QueryTripsByRouteId extends UseCase<{
    routeId: string;
}, Trip[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}