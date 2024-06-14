import {UseCaseInteractor} from "./UseCaseInteractor";
import {Stop} from "../../core/models/Stop";
import {QueryAllStops} from "../../core/usecases/QueryAllStops";

export class QueryAllStopsInteractor extends UseCaseInteractor<QueryAllStops, {}, Stop[]> {

    public constructor(readonly repositories: any) {
        super(new QueryAllStops());
    }

    override async execute(input: {}): Promise<Stop[]> {
        return this.repositories.getAllStops()
    }
}