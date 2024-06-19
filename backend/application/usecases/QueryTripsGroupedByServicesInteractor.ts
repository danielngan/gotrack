import {UseCaseInteractor} from "./UseCaseInteractor";
import {
    QueryTripsGroupedByServices,
    QueryTripsGroupedByServicesInput,
    QueryTripsGroupedByServicesOutput
} from "../../../core/application/usecases/QueryTripsGroupedByServices";
import {Repositories} from "../repositories/Repositories";

export class QueryTripsGroupedByServicesInteractor
    extends UseCaseInteractor<QueryTripsGroupedByServices, QueryTripsGroupedByServicesInput, QueryTripsGroupedByServicesOutput> {

    constructor(readonly repositories: Repositories) {
        super(new QueryTripsGroupedByServices());
    }

    override async execute(input: QueryTripsGroupedByServicesInput): Promise<QueryTripsGroupedByServicesOutput> {
        return await this.repositories.queryTripsGroupedByServices(input);
    }
}