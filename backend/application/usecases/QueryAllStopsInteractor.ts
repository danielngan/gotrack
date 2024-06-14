import {UseCaseInteractor} from "./UseCaseInteractor";
import {Stop} from "../../../core/domain/entities/Stop";
import {QueryAllStops} from "../../../core/application/usecases/QueryAllStops";

export class QueryAllStopsInteractor extends UseCaseInteractor<QueryAllStops, {}, Stop[]> {

    constructor(readonly repositories: any) {
        super(new QueryAllStops());
    }

    override async execute(input: {}): Promise<Stop[]> {
        return this.repositories.getAllStops()
    }
}