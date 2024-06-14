import {UseCase, UseCaseType} from "./UseCase";
import {Route} from "../models/Route";

export class QueryAllRoutes extends UseCase<{}, Route[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}