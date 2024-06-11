import {StopTimeRepository} from "../StopTimeRepository";
import mongoose, {Schema} from "mongoose";
import {StopTime} from "../../../core/models/StopTime";


export const StopTimeSchema = new Schema<StopTime>({
    stop_id: {
        type: String, required: true
    },
    trip_id: {
        type: String, required: true
    },
    arrival_time: {
        type: String, required: true
    },
    departure_time: {
        type: String, required: true
    },
    stop_sequence: {
        type: Number, required: true
    },
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

    getAllStopTimes(): Promise<StopTime[]> {
        throw new Error("Method not implemented.");
    }

    getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined> {
        throw new Error("Method not implemented.");
    }

    getStopTimesByStopId(stopId: string): Promise<StopTime[]> {
        throw new Error("Method not implemented.");
    }

    getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        throw new Error("Method not implemented.");
    }

    addStopTime(stopTime: StopTime): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateStopTime(stopTime: StopTime): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteStopTime(stopId: string, tripId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}