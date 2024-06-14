import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";

export class QueryStopsByRouteId extends UseCase<{
    routeId: string;
}, Stop[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}
