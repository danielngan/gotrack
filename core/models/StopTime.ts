import {PickupDropOffType} from "../types/Types";

/**
 * A model that represents a stop time as defined in the GTFS.
 * A stop time is uniquely identified by the combination of the stop_id and trip_id.
 */
export interface StopTime {
    /**
     * The stop ID which is part of the primary key of the stop time.
     */
    stop_id: string;

    /**
     * The trip ID which is part of the primary key of the stop time.
     */
    trip_id: string;

    arrival_time: string;

    departure_time: string;

    stop_sequence: number;

    stop_headsign?: string;

    pickup_type?: PickupDropOffType;

    drop_off_type?: PickupDropOffType;

    shape_dist_traveled?: number;

    timepoint?: 0 | 1;
}