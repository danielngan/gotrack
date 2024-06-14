import {DirectionId} from "../types/DirectionId";
import {WheelchairAccessible} from "../types/WheelchairAccessible";
import {BikesAllowed} from "../types/BikesAllowed";

/**
 * A model that represents a trip as defined in the GTFS.
 * A trip is uniquely identified by its trip_id.
 */
export interface Trip {
    /**
     * The ID of the trip, which is the primary key.
     */
    readonly trip_id: string;

    readonly route_id: string;

    readonly service_id: string;

    readonly trip_headsign?: string;

    readonly trip_short_name?: string;

    readonly direction_id?: DirectionId;

    readonly block_id?: string;

    readonly shape_id?: string;

    readonly wheelchair_accessible?: WheelchairAccessible;

    readonly bikes_allowed?: BikesAllowed;
}