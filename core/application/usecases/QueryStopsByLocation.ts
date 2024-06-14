import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";

export class QueryStopsByLocation extends UseCase<{
    latitude: number;
    longitude: number;
    radius?: number;
}, Stop[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}
