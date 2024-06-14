import {UseCase, UseCaseType} from "./UseCase";
import {Stop} from "../models/Stop";

export class QueryAllStops extends UseCase<{}, Stop[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}