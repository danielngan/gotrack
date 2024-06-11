import {StopTime} from "../../core/models/StopTime";

export interface StopTimeRepository {

    getAllStopTimes(): Promise<StopTime[]>;

    getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined>;

    getStopTimesByStopId(stopId: string): Promise<StopTime[]>;

    getStopTimesByTripId(tripId: string): Promise<StopTime[]>;

    addStopTime(stopTime: StopTime): Promise<void>;

    updateStopTime(stopTime: StopTime): Promise<void>;

    deleteStopTime(stopId: string, tripId: string): Promise<void>;
}