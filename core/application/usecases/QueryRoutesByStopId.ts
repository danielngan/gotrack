import {UseCase, UseCaseType} from "./UseCase";
import {Route} from "../../domain/entities/Route";

export class QueryRoutesByStopId extends UseCase<{
    stop_id: string;
}, Route[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}