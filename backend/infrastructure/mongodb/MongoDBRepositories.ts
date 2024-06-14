import {MongoDBRouteRepository} from "./MongoDBRouteRepository";
import {MongoDBStopRepository} from "./MongoDBStopRepository";
import {MongoDBStopTimeRepository} from "./MongoDBStopTimeRepository";
import {MongoDBTripRepository} from "./MongoDBTripRepository";
import {Repositories} from "../../application/repositories/Repositories";
import {applyMixins} from "../../../core/utils/Utils";

export interface MongoDBRepositories
    extends
        MongoDBRouteRepository,
        MongoDBStopRepository,
        MongoDBStopTimeRepository,
        MongoDBTripRepository,
        Repositories {
}

export class MongoDBRepositories {

    async clearAll(): Promise<void> {
        await Promise.all([
            this.clearAllRoutes(),
            this.clearAllStops(),
            this.clearAllStopTimes(),
            this.clearAllTrips()
        ]);
    }
}

applyMixins(MongoDBRepositories, [
    MongoDBRouteRepository,
    MongoDBStopRepository,
    MongoDBStopTimeRepository,
    MongoDBTripRepository
]);
