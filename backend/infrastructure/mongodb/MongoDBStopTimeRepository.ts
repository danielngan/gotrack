import {StopTimeRepository} from "../../application/repositories/StopTimeRepository";
import {StopTime} from "../../../core/domain/entities/StopTime";

import {
    addEntry,
    defineSchema,
    deleteEntry,
    deleteManyEntries,
    findManyEntries,
    findOneEntry,
    updateEntry
} from "./MongoDBUtils";
import {Timepoint} from "../../../core/domain/types/Timepoint";
import {PickupDropOffType} from "../../../core/domain/types/PickupDropOffType";


export const [StopTimeSchema, StopTimeModel] = defineSchema<StopTime>("Stop_Time", {
    trip_id: {type: String, required: true},
    stop_sequence: {type: Number, required: true},
    stop_id: {type: String, required: true},
    arrival_time: {type: String, required: true},
    departure_time: {type: String, required: true},
    stop_headsign: String,
    pickup_type: {type: Number, enum: PickupDropOffType},
    drop_off_type: {type: Number, enum: PickupDropOffType},
    shape_dist_traveled: Number,
    timepoint: {type: Number, enum: Timepoint},
});

StopTimeSchema.index({trip_id: 1, stop_sequence: 1}, {unique: true});

export class MongoDBStopTimeRepository implements StopTimeRepository {

    async getAllStopTimes(): Promise<StopTime[]> {
        return await findManyEntries(StopTimeModel, {})
    }

    async getStopTime(tripId: string, stopSequence: number): Promise<StopTime | undefined> {
        return await findOneEntry(StopTimeModel, {trip_id: tripId, stop_sequence: stopSequence})
    }

    async getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        return await findManyEntries(StopTimeModel, {trip_id: tripId})
    }

    async addStopTime(stopTime: StopTime): Promise<void> {
        await addEntry(StopTimeModel, stopTime, {trip_id: stopTime.trip_id, stop_sequence: stopTime.stop_sequence})
    }

    async updateStopTime(stopTime: Partial<StopTime> & Pick<StopTime, "trip_id" | "stop_sequence">): Promise<void> {
        await updateEntry(StopTimeModel, stopTime, {trip_id: stopTime.trip_id, stop_sequence: stopTime.stop_sequence})
    }

    async deleteStopTime(tripId: string, stopSequence: number): Promise<void> {
        await deleteEntry(StopTimeModel, {trip_id: tripId, stop_sequence: stopSequence})
    }

    async deleteAllStopTimes(): Promise<void> {
        await deleteManyEntries(StopTimeModel, {})
    }
}