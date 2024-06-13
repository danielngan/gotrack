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
            if (error instanceof MongoError && error.code === 11000 /* DuplicateEntry */) {
                throw new DuplicateEntryError(`Route with route_id: ${route.route_id} already exists)`);
            }
            throw error;
        }
    }

    async updateRoute(route: Partial<Route> & Pick<Route, "route_id">): Promise<void> {
        const result = await RouteModel.updateOne({route_id: route.route_id}, {$set: route}).exec();
        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            throw new EntryNotFoundError(`Route with route_id: ${route.route_id} not found`)
        }
    }

    async deleteRoute(routeId: string): Promise<void> {
        const result = await RouteModel.deleteOne({route_id: routeId})
        if (result.deletedCount === 0) {
            throw new EntryNotFoundError(`Route with route_id: ${routeId} not found`)
        }
    }

    async clearAllRoutes(): Promise<void> {
        await RouteModel.deleteMany({}).exec()
    }
}
