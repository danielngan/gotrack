import {TripRepository} from "../../application/repositories/TripRepository";
import {Trip} from "../../../core/domain/entities/Trip";
import mongoose, {Model, Schema} from "mongoose";
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
import {WheelchairAccessible} from "../../../core/domain/types/WheelchairAccessible";
import {BikesAllowed} from "../../../core/domain/types/BikesAllowed";

export const [TripSchema, TripModel] = defineSchema<Trip>("Trip", {
    trip_id: {type: String, required: true, index: true, unique: true},
    route_id: {type: String, required: true, index: true},
    service_id: {type: String, required: true, index: true},
    trip_headsign: String,
    trip_short_name: String,
    direction_id: Number,
    block_id: String,
    shape_id: String,
    wheelchair_accessible: {type: Number, enum: WheelchairAccessible},
    bikes_allowed: {type: Number, enum: BikesAllowed},
});

export class MongoDBTripRepository implements TripRepository {

    async getAllTrips(): Promise<Trip[]> {
        return await findManyEntries(TripModel, {})
    }

    async getTripById(tripId: string): Promise<Trip | undefined> {
        return await findOneEntry(TripModel, {trip_id: tripId})
    }

    async getTripsByRouteId(routeId: string): Promise<Trip[]> {
        return await findManyEntries(TripModel, {route_id: routeId})
    }

    async getTripsByServiceId(serviceId: string): Promise<Trip[]> {
        return await findManyEntries(TripModel, {service_id: serviceId})
    }

    async addTrip(trip: Trip): Promise<void> {
        await addEntry(TripModel, trip, {trip_id: trip.trip_id})
    }

    async updateTrip(trip: Partial<Trip> & Pick<Trip, "trip_id">): Promise<void> {
        await updateEntry(TripModel, trip, {trip_id: trip.trip_id})
    }

    async deleteTrip(tripId: string): Promise<void> {
        await deleteEntry(TripModel, {trip_id: tripId})
    }

    async clearAllTrips(): Promise<void> {
        await deleteManyEntries(TripModel, {})
    }
}