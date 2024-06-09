import {StopTime} from "../../core/models/StopTime";

export interface StopTimeRepository {

    getAllStopTimes(): Promise<StopTime[]>;

    getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined>;

    getStopTimesByStopId(stopId: string): Promise<StopTime[]>;

    getStopTimesByTripId(tripId: string): Promise<StopTime[]>;
}