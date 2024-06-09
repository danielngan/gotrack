import {PickupDropOffType} from "../types/Types";

export interface StopTime {
    trip_id: string;
    arrival_time: string;
    departure_time: string;
    stop_id: string;
    stop_sequence: number;
    stop_headsign?: string;
    pickup_type?: PickupDropOffType;
    drop_off_type?: PickupDropOffType;
    shape_dist_traveled?: number;
    timepoint?: 0 | 1;
}