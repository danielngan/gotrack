import {TripRepository} from "../TripRepository";
import {Trip} from "../../../core/models/Trip";
import mongoose, {Schema} from "mongoose";

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

    getAllTrips(): Promise<Trip[]> {
        throw new Error("Method not implemented.");
    }

    getTripById(tripId: string): Promise<Trip | undefined> {
        throw new Error("Method not implemented.");
    }

    getTripsByRouteId(routeId: string): Promise<Trip[]> {
        throw new Error("Method not implemented.");
    }

    getTripsByServiceId(serviceId: string): Promise<Trip[]> {
        throw new Error("Method not implemented.");
    }

    addTrip(trip: Trip): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateTrip(trip: Trip): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteTrip(tripId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}