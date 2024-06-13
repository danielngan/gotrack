import {LocationType} from "../types/Types";

/**
 * A model that represents a stop on a route as defined in the GTFS.
 */
export interface Stop {
    /**
     * The ID of the stop, which is the primary key.
     */
    stop_id: string;

    stop_code?: string;
    stop_name: string;
    stop_desc?: string;
    stop_lat: number;
    stop_lon: number;
    zone_id?: string;
    stop_url?: string;
    location_type?: LocationType;
    parent_station?: string;
    stop_timezone?: string;
    wheelchair_boarding?: 0 | 1 | 2;
}

