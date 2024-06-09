import {StopRepository} from "../repositories/StopRepository";
import mongoose, {Schema} from "mongoose";
import {Stop} from "../../core/models/Stop";

export const StopSchema = new Schema<Stop>({
    stop_id: { type: String, required: true },
    stop_code: String,
    stop_name: { type: String, required: true },
    stop_desc: String,
    stop_lat: { type: Number, required: true },
    stop_lon: { type: Number, required: true },
    zone_id: String,
    stop_url: String,
    location_type: Number,
    parent_station: String,
    stop_timezone: String,
    wheelchair_boarding: Number,
});

export const StopModel = mongoose.model<Stop>('Stop', StopSchema);

export class MongoDBStopRepository implements StopRepository {

    async getAllStops(): Promise<Stop[]> {
        return (await StopModel.find().exec()).map(document => document.toObject())
    }

    async getStopById(stopId: string): Promise<Stop | undefined> {
        return (await StopModel.findById(stopId).exec())?.toObject() ?? undefined
    }

    async searchStopsByName(namePattern: string): Promise<Stop[]> {
        return (await StopModel.find({ stop_name: { $regex: namePattern, $options: 'i' } }).exec()).map(document => document.toObject())
    }

    async getStopsByZoneId(zoneId: string): Promise<Stop[]> {
        return (await StopModel.find({ zone_id: zoneId }).exec()).map(document => document.toObject())
    }
}
