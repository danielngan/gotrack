import {Trip} from "../../core/models/Trip";

export interface TripRepository {
    getAllTrips(): Promise<Trip[]>;

    getTripById(tripId: string): Promise<Trip | undefined>;

    getTripsByRouteId(routeId: string): Promise<Trip[]>;

    getTripsByServiceId(serviceId: string): Promise<Trip[]>;
}