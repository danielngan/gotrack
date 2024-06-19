import {Trip} from "../../../core/domain/entities/Trip";

/**
 * A repository interface for trips that provides CRUD operations.
 */
export interface TripRepository {

    /**
     * Get all trips.
     * @returns A promise that resolves to an array of all trips.
     */
    getAllTrips(): Promise<Trip[]>;

    /**
     * Get a trip by its ID.
     * @param tripId The ID of the trip to get.
     * @returns A promise that resolves to the trip with the given ID, or undefined if no such trip exists.
     */
    getTrip(tripId: string): Promise<Trip | undefined>;

    /**
     * Get all trips for a route.
     * @param routeId The ID of the route to get trips for.
     * @returns A promise that resolves to an array of all trips for the given route.
     */
    getTripsByRouteId(routeId: string): Promise<Trip[]>;

    /**
     * Get all trips for a service of a route.
     * @param routeId The ID of the service to get trips for.
     * @param serviceId The ID of the service to get trips for.
     * @returns A promise that resolves to an array of all trips for the given service.
     */
    getTripsByRouteAndServiceId(routeId: string, serviceId: string): Promise<Trip[]>;

    /**
     * Add a trip.
     * @param trip The trip to add.
     * @returns A promise that resolves when the trip has been added.
     * @throws DuplicateEntryError If a trip with the same ID already exists.
     */
    addTrip(trip: Trip): Promise<void>;

    /**
     * Update a trip. The trip must have a trip ID; other properties are optional.
     * @param trip The trip to update; must have a trip_id property.
     * @returns A promise that resolves when the trip has been updated.
     * @throws EntryNotFoundError If no trip with the given ID exists.
     */
    updateTrip(trip: Partial<Trip> & Pick<Trip, "trip_id">): Promise<void>;

    /**
     * Delete a trip.
     * @param tripId The ID of the trip to delete.
     * @returns A promise that resolves when the trip has been deleted.
     * @throws EntryNotFoundError If no trip with the given ID exists.
     */
    deleteTrip(tripId: string): Promise<void>;

    /**
     * Delete all trips. This method deletes all trips from the repository.
     * It is recommended to use this method only for testing purposes, and not in production.
     * @returns A promise that resolves when all trips have been deleted.
     */
    clearAllTrips(): Promise<void>;
}