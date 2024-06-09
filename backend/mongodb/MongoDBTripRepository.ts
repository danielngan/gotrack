import {TripRepository} from "../repositories/TripRepository";
import {Trip} from "../../core/models/Trip";
import mongoose, {Schema} from "mongoose";

export const TripSchema = new Schema<Trip>({
    route_id: { type: String, required: true },
    service_id: { type: String, required: true },
    trip_id: { type: String, required: true },
    trip_headsign: String,
    trip_short_name: String,
    direction_id: Number,
    block_id: String,
    shape_id: String,
    wheelchair_accessible: Number,
    bikes_allowed: Number,
});

export const TripModel = mongoose.model<Trip>('Trip', TripSchema);

export class MongoDBTripRepository implements TripRepository {

    async getAllTrips(): Promise<Trip[]> {
        return (await TripModel.find().exec()).map(document => document.toObject())
    }

    async getTripById(tripId: string): Promise<Trip | undefined> {
        return (await TripModel.findById(tripId).exec())?.toObject() ?? undefined
    }

    async getTripsByRouteId(routeId: string): Promise<Trip[]> {
        return (await TripModel.find({ route_id: routeId }).exec()).map(document => document.toObject())
    }

    async getTripsByServiceId(serviceId: string): Promise<Trip[]> {
        return (await TripModel.find({ service_id: serviceId }).exec()).map(document => document.toObject())
    }
}