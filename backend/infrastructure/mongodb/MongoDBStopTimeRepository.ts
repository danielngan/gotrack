import {StopTimeRepository} from "../../application/repositories/StopTimeRepository";
import mongoose, {Model, Schema} from "mongoose";
import {StopTime} from "../../../core/domain/entities/StopTime";
import {MongoError} from "mongodb";
import {EntryNotFoundError} from "../../../core/application/exceptions/EntryNotFoundError";
import {DuplicateEntryError} from "../../../core/application/exceptions/DuplicateEntryError";
import {StopModel} from "./MongoDBStopRepository";

import {
    addEntry,
    defaultSchemaOptions, defineSchema, deleteEntry, deleteManyEntries, findManyEntries, findOneEntry,
    onDeleteNotFound,
    onDuplicateEntry,
    onUpdateNotFound,
    toObject,
    toObjects, updateEntry
} from "./MongoDBUtils";
import {Timepoint} from "../../../core/domain/types/Timepoint";
import {PickupDropOffType} from "../../../core/domain/types/PickupDropOffType";


export const [StopTimeSchema, StopTimeModel] = defineSchema<StopTime>("StopTime", {
    stop_id: {type: String, required: true},
    trip_id: {type: String, required: true},
    arrival_time: {type: String, required: true},
    departure_time: {type: String, required: true},
    stop_sequence: {type: Number, required: true},
    stop_headsign: String,
    pickup_type: {type: Number, enum: PickupDropOffType},
    drop_off_type: {type: Number, enum: PickupDropOffType},
    shape_dist_traveled: Number,
    timepoint: {type: Number, enum: Timepoint},
});

StopTimeSchema.index({stop_id: 1, trip_id: 1}, {unique: true});

export class MongoDBStopTimeRepository implements StopTimeRepository {

    async getAllStopTimes(): Promise<StopTime[]> {
        return await findManyEntries(StopTimeModel, {})
    }

    async getStopTimeById(stopId: string, tripId: string): Promise<StopTime | undefined> {
        return await findOneEntry(StopTimeModel, {stop_id: stopId, trip_id: tripId})
    }

    async getStopTimesByStopId(stopId: string): Promise<StopTime[]> {
        return await findManyEntries(StopTimeModel, {stop_id: stopId})
    }

    async getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        return await findManyEntries(StopTimeModel, {trip_id: tripId})
    }

    async addStopTime(stopTime: StopTime): Promise<void> {
        await addEntry(StopTimeModel, stopTime, {stop_id: stopTime.stop_id, trip_id: stopTime.trip_id})
    }

    async updateStopTime(stopTime: Partial<StopTime> & Pick<StopTime, "stop_id" | "trip_id">): Promise<void> {
        await updateEntry(StopTimeModel, stopTime, {stop_id: stopTime.stop_id, trip_id: stopTime.trip_id})
    }

    async deleteStopTime(stopId: string, tripId: string): Promise<void> {
        await deleteEntry(StopTimeModel, {stop_id: stopId, trip_id: tripId})
    }

    async clearAllStopTimes(): Promise<void> {
        await deleteManyEntries(StopTimeModel, {})
    }
}