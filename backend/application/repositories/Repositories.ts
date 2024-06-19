import {RouteRepository} from "./RouteRepository";
import {StopRepository} from "./StopRepository";
import {StopTimeRepository} from "./StopTimeRepository";
import {TripRepository} from "./TripRepository";
import {Trip} from "../../../core/domain/entities/Trip";
import {StopTime} from "../../../core/domain/entities/StopTime";
import {Stop} from "../../../core/domain/entities/Stop";
import {
    QueryTripsGroupedByServices,
    QueryTripsGroupedByServicesInput,
    QueryTripsGroupedByServicesOutput
} from "../../../core/application/usecases/QueryTripsGroupedByServices";
import {CalendarDateRepository} from "./CalendarDateRepository";
import {ShapeRepository} from "./ShapeRepository";
import {CalendarRepository} from "./CalendarRepository";


/**
 * A collection of repositories for different entities. This interface is used to
 * group all repositories together and to provide a single point of access to all
 * repositories. This interface also provides methods which are not specific to a
 * single entity, such as a method to clear all repositories.
 */
export interface Repositories
    extends
        CalendarRepository,
        CalendarDateRepository,
        RouteRepository,
        ShapeRepository,
        StopRepository,
        StopTimeRepository,
        StopRepository,
        TripRepository {

    /**
     * Clears all repositories. This method deletes all data from all repositories.
     * This method is useful for testing purposes, and should not be used in production.
     */
    deleteAll(): Promise<void>;

    queryTripsGroupedByServices(input: QueryTripsGroupedByServicesInput): Promise<QueryTripsGroupedByServicesOutput>
}