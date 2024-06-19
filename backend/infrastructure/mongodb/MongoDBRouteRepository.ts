import {RouteRepository} from "../../application/repositories/RouteRepository";
import {Route} from "../../../core/domain/entities/Route";
import {
    addEntry,
    defineSchema,
    deleteEntry,
    deleteManyEntries,
    findManyEntries,
    findOneEntry,
    updateEntry
} from "./MongoDBUtils";
import {ContinuousPickupDropOffType} from "../../../core/domain/types/ContinuousPickupDropOffType";

export const [RouteSchema, RouteModel] = defineSchema<Route>("Route", {
    route_id: {type: String, required: true, index: true, unique: true, },
    agency_id: {type: String, required: true},
    route_short_name: {type: String, required: true, index: true, unique: true},
    route_long_name: {type: String, required: true, index: true},
    route_type: {type: Number, required: true},
    route_desc: String,
    route_url: String,
    route_color: String,
    route_text_color: String,
    route_sort_order: Number,
    continuous_pickup: { type: Number, enum: ContinuousPickupDropOffType },
    continuous_drop_off: {type: Number, enum: ContinuousPickupDropOffType},
});

export class MongoDBRouteRepository implements RouteRepository {

    async getAllRoutes(): Promise<Route[]> {
        return await findManyEntries(RouteModel, {})
    }

    async getRoute(routeId: string): Promise<Route | undefined> {
        return await findOneEntry(RouteModel, {route_id: routeId})
    }

    async getRouteByShortName(shortName: string): Promise<Route | undefined> {
        return await findOneEntry(RouteModel, {route_short_name: shortName})
    }

    async searchRoutesByLongName(namePattern: string): Promise<Route[]> {
        return await findManyEntries(RouteModel, {route_long_name: {$regex: namePattern, $options: "i"}})
    }

    async addRoute(route: Route): Promise<void> {
        await addEntry(RouteModel, route, {route_id: route.route_id})
    }

    async updateRoute(route: Partial<Route> & Pick<Route, "route_id">): Promise<void> {
        await updateEntry(RouteModel, route, {route_id: route.route_id})
    }

    async deleteRoute(routeId: string): Promise<void> {
        await deleteEntry(RouteModel, {route_id: routeId})
    }

    async clearAllRoutes(): Promise<void> {
        await deleteManyEntries(RouteModel, {})
    }
}
