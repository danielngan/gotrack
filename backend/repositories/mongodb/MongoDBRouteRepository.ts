import {RouteRepository} from "../RouteRepository";
import mongoose, {Schema} from "mongoose";
import {Route} from "../../../core/models/Route";
import {DuplicateEntryError, EntryNotFoundError} from "../../../core/types/Types";
import {MongoError} from "mongodb"

export const RouteSchema = new Schema<Route>({
    route_id: {
        type: String, required: true, index: true, unique: true
    },
    agency_id: {
        type: String, required: true
    },
    route_short_name: {
        type: String, required: true, index: true, unique: true
    },
    route_long_name: {
        type: String, required: true, index: true
    },
    route_type: {
        type: Number, required: true
    },
    route_desc: String,
    route_url: String,
    route_color: String,
    route_text_color: String,
    route_sort_order: Number,
    continuous_pickup: Number,
    continuous_drop_off: Number,
}, {
    versionKey: false,
    toObject: {
        transform: (doc, ret) => {
            delete ret._id
        }
    }
});

export const RouteModel = mongoose.model<Route>('Route', RouteSchema);

export class MongoDBRouteRepository implements RouteRepository {

    async getAllRoutes(): Promise<Route[]> {
        return (await RouteModel.find().exec()).map(document => document.toObject())
    }

    async getRouteById(routeId: string): Promise<Route | undefined> {
        return (await RouteModel.findOne({route_id: routeId}).exec())?.toObject() ?? undefined
    }

    async getRouteByShortName(shortName: string): Promise<Route | undefined> {
        return (await RouteModel.findOne({route_short_name: shortName}).exec())?.toObject() ?? undefined
    }

    async searchRoutesByLongName(namePattern: string): Promise<Route[]> {
        return (await RouteModel.find({
            route_long_name: {
                $regex: namePattern,
                $options: "i"
            }
        }).exec()).map(document => document.toObject())
    }

    async addRoute(route: Route): Promise<void> {
        try {
            await RouteModel.create(route)
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000 /* DuplicateKey */) {
                throw new DuplicateEntryError(`Trying to add a Route with a duplicate route_id: ${route.route_id}`);
            }
            throw error;
        }
    }

    async updateRoute(route: Partial<Route> & Pick<Route, "route_id">): Promise<void> {
        try {
            await RouteModel.updateOne({route_id: route.route_id}, {$set: route}).exec();
        } catch (error) {
            if (error instanceof MongoError && error.code === 211 /* KeyNotFound */) {
                throw new EntryNotFoundError(`Trying to update a non-existing Route with route_id: ${route.route_id}`)
            }
            throw error;
        }
    }

    async deleteRoute(routeId: string): Promise<void> {
        try {
            await RouteModel.deleteOne({route_id: routeId})
        } catch (error) {
            if (error instanceof MongoError && error.code === 211 /* KeyNotFound */) {
                throw new EntryNotFoundError(`Trying to delete a non-existing Route with route_id: ${routeId}`)
            }
            throw error;
        }
    }
}