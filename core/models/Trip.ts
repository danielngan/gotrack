import {BikesAllowed, DirectionId, WheelchairAccessible} from "../types/Types";

export interface Trip {
    route_id: string;
    service_id: string;
    trip_id: string;
    trip_headsign?: string;
    trip_short_name?: string;
    direction_id?: DirectionId;
    block_id?: string;
    shape_id?: string;
    wheelchair_accessible?: WheelchairAccessible;
    bikes_allowed?: BikesAllowed;
}