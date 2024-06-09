import {MongoDBRouteRepository} from "./MongoDBRouteRepository";
import {MongoDBStopRepository} from "./MongoDBStopRepository";
import {MongoDBStopTimeRepository} from "./MongoDBStopTimeRepository";
import {MongoDBTripRepository} from "./MongoDBTripRepository";

export interface MongoDBRepositories
    extends MongoDBRouteRepository, MongoDBStopRepository, MongoDBStopTimeRepository, MongoDBTripRepository {}

export class MongoDBRepositories  {
}

function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    });
}

applyMixins(MongoDBRepositories, [MongoDBRouteRepository, MongoDBStopRepository, MongoDBStopTimeRepository, MongoDBTripRepository]);
