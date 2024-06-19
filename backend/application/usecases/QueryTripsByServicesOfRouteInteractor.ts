import {UseCaseInteractor} from "./UseCaseInteractor";
import {
    QueryTripsByServicesOfRoute,
    QueryTripsByServicesOfRouteInput,
    QueryTripsByServicesOfRouteOutput
} from "../../../core/application/usecases/QueryTripsByServicesOfRoute";
import {Repositories} from "../repositories/Repositories";

export class QueryTripsByServicesOfRouteInteractor
    extends UseCaseInteractor<QueryTripsByServicesOfRoute, QueryTripsByServicesOfRouteInput, QueryTripsByServicesOfRouteOutput> {

    constructor(readonly repositories: Repositories) {
        super(new QueryTripsByServicesOfRoute());
    }

    override async execute(input: QueryTripsByServicesOfRouteInput): Promise<QueryTripsByServicesOfRouteOutput> {
        return await this.repositories.queryTripsByServicesOfRoute(input);
    }
}