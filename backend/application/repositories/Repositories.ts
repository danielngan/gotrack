import {RouteRepository} from "./RouteRepository";
import {StopRepository} from "./StopRepository";
import {StopTimeRepository} from "./StopTimeRepository";
import {TripRepository} from "./TripRepository";

export interface Repositories
    extends
        RouteRepository,
        StopRepository,
        StopTimeRepository,
        StopRepository,
        TripRepository {

    clearAll(): Promise<void>;
}