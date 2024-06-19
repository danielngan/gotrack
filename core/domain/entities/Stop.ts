import {LocationType} from "../types/LocationType";
import {WheelchairBoarding} from "../types/WheelchairBoarding";
import {StopModel} from "../../../backend/infrastructure/mongodb/MongoDBStopRepository";
import {StopTime} from "./StopTime";
import { Trip } from "./Trip";

/**
 * A model that represents a stop on a route as defined in the GTFS.
 */
export interface Stop {
    /**
     * The ID of the stop, which is the primary key.
     */
    readonly stop_id: string;

    readonly stop_code?: string;
    readonly stop_name: string;
    readonly stop_desc?: string;
    readonly stop_lat: number;
    readonly stop_lon: number;
    readonly zone_id?: string;
    readonly stop_url?: string;
    readonly location_type?: LocationType;
    readonly parent_station?: string;
    readonly stop_timezone?: string;
    readonly wheelchair_boarding?: WheelchairBoarding;
}

export type StopWithStopTimes = Stop & { stop_times: Record<string, StopTime> }

export type TripWithStopTimes = Trip & { stop_times: Record<number, StopTime> }