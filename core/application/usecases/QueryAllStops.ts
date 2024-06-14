import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../../domain/entities/Stop";

export class QueryAllStops extends UseCase<{}, Stop[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}