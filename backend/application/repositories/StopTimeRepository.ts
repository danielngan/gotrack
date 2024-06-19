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
     * Get a stop time by trip ID and stop sequence. If no stop time with the given trip ID and stop sequence exists,
     * the method returns undefined.
     * @param tripId
     * @param stopSequence
     * @returns A promise that resolves to the stop time with the given trip ID and stop sequence,
     *          or undefined if no such stop time exists.
     */
    getStopTime(tripId: string, stopSequence: number): Promise<StopTime | undefined>;

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
     * @throws DuplicateEntryError If a stop time with the same trip ID and stop sequence already exists.
     */
    addStopTime(stopTime: StopTime): Promise<void>;

    /**
     * Update a stop time. The stop time must have a trip ID and stop sequence; other properties are optional.
     * @param stopTime The stop time to update; must have a trip_id and stop_sequence property.
     * @returns A promise that resolves when the stop time has been updated.
     */
    updateStopTime(stopTime: Partial<StopTime> & Pick<StopTime, "trip_id" | "stop_sequence">): Promise<void>;

    /**
     * Delete a stop time by trip ID and stop sequence. If no stop time with the given trip ID and stop sequence exists,
     * the method throws EntryNotFoundError.
     * @param tripId The ID of the trip the stop time belongs to.
     * @param stopSequence The stop sequence of the stop time to delete.
     * @returns A promise that resolves when the stop time has been deleted.
     */
    deleteStopTime(tripId: string, stopSequence: number): Promise<void>;

    /**
     * Delete all stop times. This method deletes all stop times from the repository.
     * It is useful for testing purposes, and should not be used in production.
     * @returns A promise that resolves when all stop times have been deleted.
     */
    clearAllStopTimes(): Promise<void>;
}