import {RouteRepository} from "../repositories/RouteRepository";
import mongoose, {Schema} from "mongoose";
import {Route} from "../../core/models/Route";

export const RouteSchema = new Schema<Route>({
    route_id: { type: String, required: true },
    agency_id: { type: String, required: true },
    route_short_name: { type: String, required: true },
    route_long_name: { type: String, required: true },
    route_desc: String,
    route_type: { type: Number, required: true },
    route_url: String,
    route_color: String,
    route_text_color: String,
    route_sort_order: Number,
    continuous_pickup: Number,
    continuous_drop_off: Number,
});

export const RouteModel = mongoose.model<Route>('Route', RouteSchema);

export class MongoDBRouteRepository implements RouteRepository {

    async getAllRoutes(): Promise<Route[]> {
        return (await RouteModel.find().exec()).map(document => document.toObject())
    }

    async getRouteById(routeId: string): Promise<Route | undefined> {
        return (await RouteModel.findById(routeId).exec())?.toObject() ?? undefined
    }
    getRouteByShortName(shortName: string): Promise<Route | undefined> {
        throw new Error("Method not implemented.");
    }
    searchRoutesByLongName(namePattern: string): Promise<Route[]> {
        throw new Error("Method not implemented.");
    }
}