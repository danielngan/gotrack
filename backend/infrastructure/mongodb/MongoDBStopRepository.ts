import {StopRepository} from "../../application/repositories/StopRepository";
import {Stop} from "../../../core/domain/entities/Stop";

import {
    addEntry,
    defineSchema,
    deleteEntry,
    deleteManyEntries,
    findManyEntries,
    findOneEntry,
    updateEntry
} from "./MongoDBUtils";
import {LocationType} from "../../../core/domain/types/LocationType";
import {WheelchairBoarding} from "../../../core/domain/types/WheelchairBoarding";

export const [StopSchema, StopModel] = defineSchema<Stop>("Stop", {
    stop_id: {type: String, required: true, index: true, unique: true},
    stop_name: {type: String, required: true, index: true},
    stop_lat: {type: Number, required: true},
    stop_lon: {type: Number, required: true},
    stop_code: String,
    stop_desc: String,
    zone_id: String,
    stop_url: String,
    location_type: {type: Number, enum: LocationType},
    parent_station: String,
    stop_timezone: String,
    wheelchair_boarding: {type: Number, enum: WheelchairBoarding},
});

export class MongoDBStopRepository implements StopRepository {

    async getAllStops(): Promise<Stop[]> {
        return await findManyEntries(StopModel, {})
    }

    async getStop(stopId: string): Promise<Stop | undefined> {
        return await findOneEntry(StopModel, {stop_id: stopId})
    }

    async searchStopsByName(namePattern: string): Promise<Stop[]> {
        return await findManyEntries(StopModel, {stop_name: {$regex: namePattern, $options: "i"}})
    }

    async getStopsByZoneId(zoneId: string): Promise<Stop[]> {
        return await findManyEntries(StopModel, {zone_id: zoneId})
    }

    async addStop(stop: Stop): Promise<void> {
        await addEntry(StopModel, stop, {stop_id: stop.stop_id})
    }

    async updateStop(stop: Partial<Stop> & Pick<Stop, "stop_id">): Promise<void> {
        await updateEntry(StopModel, stop, {stop_id: stop.stop_id})
    }

    async deleteStop(stopId: string): Promise<void> {
        await deleteEntry(StopModel, {stop_id: stopId})
    }

    async clearAllStops(): Promise<void> {
        await deleteManyEntries(StopModel, {})
    }

}
