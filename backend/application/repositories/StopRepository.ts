import {Stop} from "../../../core/domain/entities/Stop";

/**
 * A repository for Stops that provides CRUD operations.
 */
export interface StopRepository {

    /**
     * Get all stops.
     * @returns A promise that resolves to an array of all stops.
     */
    getAllStops(): Promise<Stop[]>;

    /**
     * Get a stop by its ID.
     * @param stopId The ID of the stop to get.
     * @returns A promise that resolves to the stop with the given ID, or undefined if no such stop exists.
     */
    getStopById(stopId: string): Promise<Stop | undefined>;

    /**
     * Search stops by name.
     * @param namePattern
     * @returns A promise that resolves to an array of stops whose name matches the given pattern.
     */
    searchStopsByName(namePattern: string): Promise<Stop[]>;

    /**
     * Get stops by zone ID.
     * @param zoneId The ID of the zone to get stops for.
     * @returns A promise that resolves to an array of stops in the given zone.
     */
    getStopsByZoneId(zoneId: string): Promise<Stop[]>;

    /**
     * Add a stop.
     * @param stop
     * @returns A promise that resolves when the stop has been added.
     * @throws DuplicateEntryError If a stop with the same ID already exists.
     */
    addStop(stop: Stop): Promise<void>;

    /**
     * Update a stop.
     * @param stop The stop to update. The stop must have a stop_id property; other properties are optional.
     * @returns A promise that resolves when the stop has been updated.
     * @throws EntryNotFoundError If no stop with the given ID exists.
     */
    updateStop(stop: Partial<Stop> & Pick<Stop, "stop_id">): Promise<void>;

    /**
     * Delete a stop.
     * @param stopId
     * @returns A promise that resolves when the stop has been deleted.
     * @throws EntryNotFoundError If no stop with the given ID exists.
     */
    deleteStop(stopId: string): Promise<void>;

    /**
     * Delete all stops.
     * @returns A promise that resolves when all stops have been deleted.
     */
    clearAllStops(): Promise<void>;
}