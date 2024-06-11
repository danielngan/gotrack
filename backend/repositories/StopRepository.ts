import {Stop} from "../../core/models/Stop";

export interface StopRepository {

    getAllStops(): Promise<Stop[]>;

    getStopById(stopId: string): Promise<Stop | undefined>;

    searchStopsByName(namePattern: string): Promise<Stop[]>;

    getStopsByZoneId(zoneId: string): Promise<Stop[]>;

    addStop(stop: Stop): Promise<void>;

    updateStop(stop: Stop): Promise<void>;

    deleteStop(stopId: string): Promise<void>;
}