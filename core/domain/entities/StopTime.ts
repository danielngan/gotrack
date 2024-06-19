import {PickupDropOffType} from "../types/PickupDropOffType";
import {Timepoint} from "../types/Timepoint";

/**
 * A model that represents a stop time as defined in the GTFS.
 * A stop time is uniquely identified by the combination of trip_id and stop_sequence.
 */
export interface StopTime {
    /**
     * The ID of the trip that this stop time belongs to. This a part of the primary key.
     */
    readonly trip_id: string;

    /**
     * The sequence number of the stop in the trip. This is a part of the primary key.
     */
    readonly stop_sequence: number;

    readonly stop_id: string;
    readonly arrival_time: string;
    readonly departure_time: string;
    readonly stop_headsign?: string;
    readonly pickup_type?: PickupDropOffType;
    readonly drop_off_type?: PickupDropOffType;
    readonly shape_dist_traveled?: number;
    readonly timepoint?: Timepoint;
}
