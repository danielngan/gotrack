import {StopRepository} from "../StopRepository";
import mongoose, {Schema} from "mongoose";
import {Stop} from "../../../core/models/Stop";
import {MongoError} from "mongodb";
import {DuplicateEntryError, EntryNotFoundError} from "../../../core/types/Types";

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
    async clearAllStops(): Promise<void> {
        await StopModel.deleteMany({}).exec();
    }

    async getAllStops(): Promise<Stop[]> {
        return (await StopModel.find().exec()).map(document => document.toObject())
    }

    async getStopById(stopId: string): Promise<Stop | undefined> {
        return (await StopModel.findOne({stop_id: stopId}).exec())?.toObject()
    }

    async searchStopsByName(namePattern: string): Promise<Stop[]> {
        return (await StopModel.find({
            stop_name: {
                $regex: namePattern,
                $options: "i"
            }}).exec()).map(document => document.toObject())
    }

    async getStopsByZoneId(zoneId: string): Promise<Stop[]> {
        return (await StopModel.find({zone_id: zoneId}).exec()).map(document => document.toObject())
    }

    async addStop(stop: Stop): Promise<void> {
        try {
            await StopModel.create(stop)
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000 /* DuplicateKey */) {
                throw new DuplicateEntryError(`Trying to add a Stop with a duplicate stop_id: ${stop.stop_id}`);
            }
            throw error;
        }
    }

    async updateStop(stop: Partial<Stop> & Pick<Stop, "stop_id">): Promise<void> {
        const result = await StopModel.updateOne({stop_id: stop.stop_id}, {$set: stop}).exec();
        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            throw new EntryNotFoundError(`Stop with stop_id: ${stop.stop_id} not found`)
        }
    }

    async deleteStop(stopId: string): Promise<void> {
        const result = await StopModel.deleteOne({stop_id: stopId})
        if (result.deletedCount === 0) {
            throw new EntryNotFoundError(`Stop with stop_id: ${stopId} not found`)
        }
    }

}
