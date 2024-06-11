import {StopRepository} from "../StopRepository";
import mongoose, {Schema} from "mongoose";
import {Stop} from "../../../core/models/Stop";

export const StopSchema = new Schema<Stop>({
    stop_id: {
        type: String, required: true, index: true, unique: true
    },
    stop_name: {
        type: String, required: true, index: true
    },
    stop_lat: {
        type: Number, required: true
    },
    stop_lon: {
        type: Number, required: true
    },
    stop_code: String,
    stop_desc: String,
    zone_id: String,
    stop_url: String,
    location_type: Number,
    parent_station: String,
    stop_timezone: String,
    wheelchair_boarding: Number,
}, {
    versionKey: false,
    toObject: {
        transform: (doc, ret) => {
            delete ret._id
        }
    }
});

export const StopModel = mongoose.model<Stop>('Stop', StopSchema);

export class MongoDBStopRepository implements StopRepository {

    getAllStops(): Promise<Stop[]> {
        throw new Error("Method not implemented.");
    }

    getStopById(stopId: string): Promise<Stop | undefined> {
        throw new Error("Method not implemented.");
    }

    searchStopsByName(namePattern: string): Promise<Stop[]> {
        throw new Error("Method not implemented.");
    }

    getStopsByZoneId(zoneId: string): Promise<Stop[]> {
        throw new Error("Method not implemented.");
    }

    addStop(stop: Stop): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateStop(stop: Stop): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteStop(stopId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
