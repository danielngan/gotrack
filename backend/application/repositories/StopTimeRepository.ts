import {StopTime} from "../../../core/domain/entities/StopTime";

/**
 * A repository interface for stop times that provides CRUD operations.
 */
export interface StopTimeRepository {

    /**
     * Get all stop times.
     * @returns A promise that resolves to an array of all stop times.
     */
    getAllStopTimes(): Promise<StopTime[]>;

    /**
     * Get a stop time by its stop ID and trip ID.
     * @param stopId The ID of the stop to get.
     * @param tripId The ID of the trip to get.
     * @returns A promise that resolves to the stop time with the given stop ID and trip ID, or undefined if no such stop time exists.
     */
    getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined>;

    /**
     * Get all stop times for a stop.
     * @param stopId The ID of the stop to get stop times for.
     * @returns A promise that resolves to an array of all stop times for the given stop.
     */
    getStopTimesByStopId(stopId: string): Promise<StopTime[]>;

    /**
     * Get all stop times for a trip.
     * @param tripId The ID of the trip to get stop times for.
     * @returns A promise that resolves to an array of all stop times for the given trip.
     */
    getStopTimesByTripId(tripId: string): Promise<StopTime[]>;

    /**
     * Add a stop time.
     * @param stopTime The stop time to add.
     * @returns A promise that resolves when the stop time has been added.
     * @throws DuplicateEntryError If a stop time with the same stop ID and trip ID already exists.
     */
    addStopTime(stopTime: StopTime): Promise<void>;

    /**
     * Update a stop time. The stop time must have a stop ID and trip ID; other properties are optional.
     * @param stopTime The stop time to update; must have a stop_id and trip_id property.
     * @returns A promise that resolves when the stop time has been updated.
     * @throws EntryNotFoundError If no stop time with the given stop ID and trip ID exists.
     */
    updateStopTime(stopTime: Partial<StopTime> & Pick<StopTime, "stop_id" | "trip_id">): Promise<void>;

    /**
     * Delete a stop time.
     * @param stopId The ID of the stop to delete.
     * @param tripId The ID of the trip to delete.
     * @returns A promise that resolves when the stop time has been deleted.
     * @throws EntryNotFoundError If no stop time with the given stop ID and trip ID exists.
     */
    deleteStopTime(stopId: string, tripId: string): Promise<void>;

    /**
     * Delete all stop times.
     * @returns A promise that resolves when all stop times have been deleted.
     */
    clearAllStopTimes(): Promise<void>;
}