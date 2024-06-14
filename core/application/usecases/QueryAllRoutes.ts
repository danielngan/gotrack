import {UseCase, UseCaseType} from "./UseCase";
import {Route} from "../../domain/entities/Route";

export class QueryAllRoutes extends UseCase<{}, Route[]> {
    constructor() {
        super(UseCaseType.QUERY);
    }
}