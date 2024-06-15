import {ContinuousPickupDropOffType} from "../types/ContinuousPickupDropOffType";

/**
 * A model representing a route as defined in the GTFS.
 */
export interface Route {
    /**
     * The ID of the route, which is the primary key.
     */
    readonly route_id: string;

    readonly agency_id: string;
    readonly route_short_name: string;
    readonly route_long_name: string;
    readonly route_desc?: string;
    readonly route_type: number;
    readonly route_url?: string;
    readonly route_color?: string;
    readonly route_text_color?: string;
    readonly route_sort_order?: number;
    readonly continuous_pickup?: ContinuousPickupDropOffType;
    readonly continuous_drop_off?: ContinuousPickupDropOffType;
}