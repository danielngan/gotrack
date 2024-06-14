import {UseCaseInteractor} from "./UseCaseInteractor";
import {QueryAllRoutes} from "../../core/usecases/QueryAllRoutes";
import {Route} from "../../core/models/Route";
import {Repositories} from "../repositories/Repositories";

export class QueryAllRoutesInteractor extends UseCaseInteractor<QueryAllRoutes, {}, Route[]> {

    public constructor(readonly repositories: Repositories) {
        super(new QueryAllRoutes());
    }

    override async execute(input: {}): Promise<Route[]> {
        return this.repositories.getAllRoutes();
    }
}