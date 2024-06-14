import {Route} from "../../../core/domain/entities/Route";

/**
 * Repository for routes that provides CRUD operations for routes.
 */
export interface RouteRepository {

    /**
     * Returns all routes.
     * @returns a promise that resolves to an array of all routes
     */
    getAllRoutes(): Promise<Route[]>;

    /**
     * Returns the route with the given ID. If no route with the given ID exists,
     * the method returns undefined.
     * @param routeId the ID of the route to return
     * @returns a promise that resolves to the route with the given ID or undefined
     */
    getRouteById(routeId: string): Promise<Route | undefined>;

    /**
     * Returns the route with the given short name. If no route with the given short name exists,
     * the method returns undefined.
     * @param shortName the short name of the route to return
     * @returns a promise that resolves to the route with the given short name or undefined
     */
    getRouteByShortName(shortName: string): Promise<Route | undefined>;

    /**
     * Returns all routes whose long name contains the given name pattern.
     * @param namePattern the name pattern to search for
     * @returns a promise that resolves to an array of routes whose long name contains the given pattern
     */
    searchRoutesByLongName(namePattern: string): Promise<Route[]>;

    /**
     * Adds a new route to the repository. If a route with the same ID already exists,
     * the method throws DuplicateEntryError.
     * @param route
     * @returns a promise that resolves when the route has been added
     * @throws DuplicateEntryError if a route with the same ID already exists
     */
    addRoute(route: Route): Promise<void>

    /**
     * Updates an existing route in the repository. If no route with the same ID exists,
     * the method throws EntryNotFoundError.
     * @param route
     * @returns a promise that resolves when the route has been updated
     * @throws EntryNotFoundError if no route with the same ID exists
     */
    updateRoute(route: Partial<Route> & Pick<Route, "route_id">): Promise<void>;

    /**
     * Deletes the route with the given ID. If no route with the given ID exists,
     * the method throws EntryNotFoundError.
     * @param routeId
     * @returns a promise that resolves when the route has been deleted
     * @throws EntryNotFoundError if no route with the given ID exists
     */
    deleteRoute(routeId: string): Promise<void>;

    /**
     * Deletes all routes.
     * @returns a promise that resolves when all routes have been deleted
     */
    clearAllRoutes(): Promise<void>;
}