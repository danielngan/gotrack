import {PickupDropOffType} from "../types/PickupDropOffType";

/**
 * A model that represents a stop time as defined in the GTFS.
 * A stop time is uniquely identified by the combination of the stop_id and trip_id.
 */
export interface StopTime {
    /**
     * The stop ID which is part of the primary key of the stop time.
     */
    readonly stop_id: string;

    /**
     * The trip ID which is part of the primary key of the stop time.
     */
    readonly trip_id: string;

    readonly arrival_time: string;

    readonly departure_time: string;

    readonly stop_sequence: number;

    readonly stop_headsign?: string;

    readonly pickup_type?: PickupDropOffType;

    readonly drop_off_type?: PickupDropOffType;

    readonly shape_dist_traveled?: number;

    readonly timepoint?: 0 | 1;
}