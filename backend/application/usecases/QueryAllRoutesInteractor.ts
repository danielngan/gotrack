import {UseCaseInteractor} from "./UseCaseInteractor";
import {QueryAllRoutes} from "../../../core/application/usecases/QueryAllRoutes";
import {Route} from "../../../core/domain/entities/Route";
import {Repositories} from "../repositories/Repositories";

export class QueryAllRoutesInteractor extends UseCaseInteractor<QueryAllRoutes, {}, Route[]> {

    constructor(readonly repositories: Repositories) {
        super(new QueryAllRoutes());
    }

    override async execute(input: {}): Promise<Route[]> {
        return this.repositories.getAllRoutes();
    }
}