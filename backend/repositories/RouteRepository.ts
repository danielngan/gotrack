import {Route} from "../../core/models/Route";

export interface RouteRepository {

    getAllRoutes(): Promise<Route[]>;

    getRouteById(routeId: string): Promise<Route | undefined>;

    getRouteByShortName(shortName: string): Promise<Route | undefined>;

    searchRoutesByLongName(namePattern: string): Promise<Route[]>;
}