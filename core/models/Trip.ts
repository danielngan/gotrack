import {BikesAllowed, DirectionId, WheelchairAccessible} from "../types/Types";

/**
 * A model that represents a trip as defined in the GTFS.
 * A trip is uniquely identified by its trip_id.
 */
export interface Trip {
    /**
     * The ID of the trip, which is the primary key.
     */
    trip_id: string;

    route_id: string;

    service_id: string;

    trip_headsign?: string;

    trip_short_name?: string;

    direction_id?: DirectionId;

    block_id?: string;

    shape_id?: string;

    wheelchair_accessible?: WheelchairAccessible;

    bikes_allowed?: BikesAllowed;
}