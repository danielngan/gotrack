import {StopTimeRepository} from "../repositories/StopTimeRepository";
import mongoose, {Schema} from "mongoose";
import {StopTime} from "../../core/models/StopTime";


export const StopTimeSchema = new Schema<StopTime>({
    trip_id: { type: String, required: true },
    arrival_time: { type: String, required: true },
    departure_time: { type: String, required: true },
    stop_id: { type: String, required: true },
    stop_sequence: { type: Number, required: true },
    stop_headsign: String,
    pickup_type: Number,
    drop_off_type: Number,
    shape_dist_traveled: Number,
    timepoint: Number,
});

export const StopTimeModel = mongoose.model<StopTime>('StopTime', StopTimeSchema);

export class MongoDBStopTimeRepository implements StopTimeRepository {

    async getAllStopTimes(): Promise<StopTime[]> {
        return (await StopTimeModel.find().exec()).map(document => document.toObject());
    }

    async getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined> {
        return (await StopTimeModel.findOne({stop_id: stopId, trip_id: tripId}).exec())?.toObject() ?? undefined;
    }

    async getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        return (await StopTimeModel.find({trip_id: tripId}).exec()).map(document => document.toObject());
    }

    async getStopTimesByStopId(stopId: string): Promise<StopTime[]> {
        return (await StopTimeModel.find({stop_id: stopId}).exec()).map(document => document.toObject());
    }
}