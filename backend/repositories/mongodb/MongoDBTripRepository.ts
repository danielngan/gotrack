import {TripRepository} from "../TripRepository";
import {Trip} from "../../../core/models/Trip";
import mongoose, {Schema} from "mongoose";
import {RouteModel} from "./MongoDBRouteRepository";
import {MongoError} from "mongodb";
import {DuplicateEntryError, EntryNotFoundError} from "../../../core/types/Types";

export const TripSchema = new Schema<Trip>({
    trip_id: {
        type: String, required: true, index: true, unique: true
    },
    route_id: {
        type: String, required: true, index: true
    },
    service_id: {
        type: String, required: true, index: true
    },
    trip_headsign: String,
    trip_short_name: String,
    direction_id: Number,
    block_id: String,
    shape_id: String,
    wheelchair_accessible: Number,
    bikes_allowed: Number,
}, {
    versionKey: false,
    toObject: {
        transform: (doc, ret) => {
            delete ret._id
        }
    }
});

export const TripModel = mongoose.model<Trip>('Trip', TripSchema);

export class MongoDBTripRepository implements TripRepository {
    async clearAllTrips(): Promise<void> {
        await TripModel.deleteMany({}).exec();
    }

    async getAllTrips(): Promise<Trip[]> {
        return (await TripModel.find().exec()).map(document => document.toObject())
    }

    async getTripById(tripId: string): Promise<Trip | undefined> {
        return (await TripModel.findOne({trip_id: tripId}).exec())?.toObject() ?? undefined
    }

    async getTripsByRouteId(routeId: string): Promise<Trip[]> {
        return (await TripModel.find().where('route_id').equals(routeId).exec()).map(document => document.toObject())
    }

    async getTripsByServiceId(serviceId: string): Promise<Trip[]> {
        return (await TripModel.find().where('service_id').equals(serviceId).exec()).map(document => document.toObject())
    }

    async addTrip(trip: Trip): Promise<void> {
        try {
            await TripModel.create(trip)
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000 /* DuplicateEntry */) {
                throw new DuplicateEntryError(`Trip with trip_id: ${trip.trip_id} already exists)`);
            }
            throw error;
        }
    }

    async updateTrip(trip: Partial<Trip> & Pick<Trip, "trip_id">): Promise<void> {
        const result = await TripModel.updateOne({trip_id: trip.trip_id}, {$set: trip}).exec();
        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            throw new EntryNotFoundError(`Trip with trip_id: ${trip.trip_id} not found`)
        }
    }

    async deleteTrip(tripId: string): Promise<void> {
        const result = await TripModel.deleteOne({trip_id: tripId})
        if (result.deletedCount === 0) {
            throw new EntryNotFoundError(`Trip with trip_id: ${tripId} not found`)
        }
    }
}