import {Trip} from "../../core/models/Trip";

export interface TripRepository {
    getAllTrips(): Promise<Trip[]>;

    getTripById(tripId: string): Promise<Trip | undefined>;

    getTripsByRouteId(routeId: string): Promise<Trip[]>;

    getTripsByServiceId(serviceId: string): Promise<Trip[]>;

    addTrip(trip: Trip): Promise<void>;

    updateTrip(trip: Trip): Promise<void>;

    deleteTrip(tripId: string): Promise<void>;
}