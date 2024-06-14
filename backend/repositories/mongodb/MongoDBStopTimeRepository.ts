import {StopTimeRepository} from "../StopTimeRepository";
import mongoose, {Schema} from "mongoose";
import {StopTime} from "../../../core/models/StopTime";
import {MongoError} from "mongodb";
import {DuplicateEntryError, EntryNotFoundError} from "../../../core/types/Types";


export const StopTimeSchema = new Schema<StopTime>({
    stop_id: {type: String, required: true},
    trip_id: {type: String, required: true},
    arrival_time: {type: String, required: true},
    departure_time: {type: String, required: true},
    stop_sequence: {type: Number, required: true},
    stop_headsign: String,
    pickup_type: Number,
    drop_off_type: Number,
    shape_dist_traveled: Number,
    timepoint: Number,
}, {
    versionKey: false,
    toObject: {
        transform: (doc, ret) => {
            delete ret._id
        }
    }
});

StopTimeSchema.index({stop_id: 1, trip_id: 1}, {unique: true});

export const StopTimeModel = mongoose.model<StopTime>('StopTime', StopTimeSchema);

export class MongoDBStopTimeRepository implements StopTimeRepository {
    async clearAllStopTimes(): Promise<void> {
        await StopTimeModel.deleteMany({}).exec();
    }

    async getAllStopTimes(): Promise<StopTime[]> {
        return (await StopTimeModel.find().exec()).map(document => document.toObject())
    }

    async getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined> {
        return (await StopTimeModel.findOne({stop_id: stopId, trip_id: tripId}).exec())?.toObject() ?? undefined
    }

    async getStopTimesByStopId(stopId: string): Promise<StopTime[]> {
        return (await StopTimeModel.find({stop_id: stopId}).exec()).map(document => document.toObject())
    }

    async getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        return (await StopTimeModel.find({trip_id: tripId}).exec()).map(document => document.toObject())
    }

    async addStopTime(stopTime: StopTime): Promise<void> {
        try {
            await (await StopTimeModel.create(stopTime)).save()
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000 /* DuplicateKey */) {
                throw new DuplicateEntryError(`Trying to add a Route with a duplicate stop_id: ${stopTime.stop_id}, trip_id: ${stopTime.trip_id}`);
            }
            throw error;
        }
    }

    async updateStopTime(stopTime: Partial<StopTime> & Pick<StopTime, "stop_id" | "trip_id">): Promise<void> {
        const result = await StopTimeModel.updateOne({stop_id: stopTime.stop_id, trip_id: stopTime.trip_id}, {$set: stopTime}).exec();
        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            throw new EntryNotFoundError(`Stop time with stop_id: ${stopTime.stop_id} & trip_id: ${stopTime.trip_id} not found`)
        }
    }

    async deleteStopTime(stopId: string, tripId: string): Promise<void> {
        const result = await StopTimeModel.deleteOne({stop_id: stopId, trip_id: tripId}).exec()
        if (result.deletedCount === 0) {
            throw new EntryNotFoundError(`Stop time with stop_id: ${stopId} & trip_id: ${tripId} not found`)
        }
    }
}