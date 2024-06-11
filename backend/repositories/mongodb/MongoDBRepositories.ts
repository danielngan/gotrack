import {MongoDBRouteRepository} from "./MongoDBRouteRepository";
import {MongoDBStopRepository} from "./MongoDBStopRepository";
import {MongoDBStopTimeRepository} from "./MongoDBStopTimeRepository";
import {MongoDBTripRepository} from "./MongoDBTripRepository";
import {Repositories} from "../Repositories";
import {applyMixins} from "../../../core/utils/Utils";

export interface MongoDBRepositories
    extends MongoDBRouteRepository,
        MongoDBStopRepository,
        MongoDBStopTimeRepository,
        MongoDBTripRepository,
        Repositories {
}

export class MongoDBRepositories {
}

applyMixins(MongoDBRepositories, [
    MongoDBRouteRepository,
    MongoDBStopRepository,
    MongoDBStopTimeRepository,
    MongoDBTripRepository
]);
