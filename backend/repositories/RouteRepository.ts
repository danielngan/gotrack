import {Route} from "../../core/models/Route";

export interface RouteRepository {

    /**
     * Returns all routes.
     */
    getAllRoutes(): Promise<Route[]>;

    /**
     * Returns the route with the given ID. If no route with the given ID exists,
     * the method returns undefined.
     * @param routeId the ID of the route to return
     * @returns the route with the given ID or undefined
     */
    getRouteById(routeId: string): Promise<Route | undefined>;

    /**
     * Returns the route with the given short name. If no route with the given short name exists,
     * the method returns undefined.
     * @param shortName the short name of the route to return
     * @returns the route with the given short name or undefined
     */
    getRouteByShortName(shortName: string): Promise<Route | undefined>;

    /**
     * Returns all routes whose long name contains the given name pattern.
     * @param namePattern the name pattern to search for
     */
    searchRoutesByLongName(namePattern: string): Promise<Route[]>;

    /**
     * Adds a new route to the repository. If a route with the same ID already exists,
     * the method throws DuplicateEntryError.
     * @param route
     * @throws DuplicateEntryError if a route with the same ID already exists
     */
    addRoute(route: Route): Promise<void>

    /**
     * Updates an existing route in the repository. If no route with the same ID exists,
     * the method throws EntryNotFoundError.
     * @param route
     * @throws EntryNotFoundError if no route with the same ID exists
     */
    updateRoute(route: Partial<Route> & Pick<Route, "route_id">): Promise<void>;

    /**
     * Deletes the route with the given ID. If no route with the given ID exists,
     * the method throws EntryNotFoundError.
     * @param routeId
     * @throws EntryNotFoundError if no route with the given ID exists
     */
    deleteRoute(routeId: string): Promise<void>;
}