import {MongoDBRouteRepository, RouteModel} from "./MongoDBRouteRepository";
import {MongoDBStopRepository, StopModel} from "./MongoDBStopRepository";
import {MongoDBStopTimeRepository, StopTimeModel} from "./MongoDBStopTimeRepository";
import {MongoDBTripRepository, TripModel} from "./MongoDBTripRepository";
import {Repositories} from "../../application/repositories/Repositories";
import {applyMixins} from "../../../core/utils/Utils";
import {Model} from "mongoose";

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

    async ensureIndexes(): Promise<void> {
        await Promise.all([
            RouteModel.ensureIndexes({background: false}),
            StopModel.ensureIndexes({background: false}),
            StopTimeModel.ensureIndexes({background: false}),
            TripModel.ensureIndexes({background: false})
        ]);
    }
}

applyMixins(MongoDBRepositories, [
    MongoDBRouteRepository,
    MongoDBStopRepository,
    MongoDBStopTimeRepository,
    MongoDBTripRepository
]);
