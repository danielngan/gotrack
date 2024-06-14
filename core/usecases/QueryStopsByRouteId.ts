import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../models/Stop";

export class QueryStopsByRouteId extends UseCase<{
    routeId: string;
}, Stop[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}
