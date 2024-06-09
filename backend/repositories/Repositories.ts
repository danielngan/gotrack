import {RouteRepository} from "./RouteRepository";
import {StopRepository} from "./StopRepository";
import {StopTimeRepository} from "./StopTimeRepository";

export interface Repositories extends
    RouteRepository, StopRepository, StopTimeRepository, StopRepository {

}