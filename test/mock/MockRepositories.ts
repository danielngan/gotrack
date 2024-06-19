import {Repositories} from "../../backend/application/repositories/Repositories";
import {Route} from "../../core/domain/entities/Route";
import {Trip} from "../../core/domain/entities/Trip";
import {StopTime} from "../../core/domain/entities/StopTime";
import {Stop} from "../../core/domain/entities/Stop";
import {EntryNotFoundError} from "../../core/application/exceptions/EntryNotFoundError";
import {DuplicateEntryError} from "../../core/application/exceptions/DuplicateEntryError";

export class MockRepositories implements Repositories {

    private routes: Route[] = [];

    async getAllRoutes(): Promise<Route[]> {
        return this.routes;
    }

    async getRoute(routeId: string): Promise<Route | undefined> {
        return this.routes.find(route => route.route_id === routeId);
    }

    async getRouteByShortName(shortName: string): Promise<Route | undefined> {
        return this.routes.find(route => route.route_short_name === shortName);
    }

    async searchRoutesByLongName(namePattern: string): Promise<Route[]> {
        const regex = new RegExp(namePattern, 'i');
        return this.routes.filter(route => regex.test(route.route_long_name));
    }

    async addRoute(route: Route): Promise<void> {
        if (this.routes.find(r => r.route_id === route.route_id)) {
            throw new DuplicateEntryError(`Route with ID ${route.route_id} already exists`)
        }
        this.routes.push(route);
    }

    async updateRoute(route: Partial<Route> & { route_id: string }): Promise<void> {
        const index = this.routes.findIndex(r => r.route_id === route.route_id);
        if (index === -1) {
            throw new EntryNotFoundError(`Route with ID ${route.route_id} not found`)
        }
        this.routes[index] = { ...this.routes[index], ...route };
    }

    async deleteRoute(routeId: string): Promise<void> {
        const index = this.routes.findIndex(r => r.route_id === routeId);
        if (index === -1) {
            throw new EntryNotFoundError(`Route with ID ${routeId} not found`)
        }
        this.routes.splice(index, 1);
    }

    async clearAllRoutes(): Promise<void> {
        this.routes.length = 0;
    }


    private stops: Stop[] = [];

    async getAllStops(): Promise<Stop[]> {
        return this.stops;
    }

    async getStop(stopId: string): Promise<Stop | undefined> {
        return this.stops.find(stop => stop.stop_id === stopId);
    }

    async searchStopsByName(namePattern: string): Promise<Stop[]> {
        const regex = new RegExp(namePattern, 'i');
        return this.stops.filter(stop => regex.test(stop.stop_name));
    }

    async getStopsByZoneId(zoneId: string): Promise<Stop[]> {
        return this.stops.filter(stop => stop.zone_id === zoneId);
    }

    async addStop(stop: Stop): Promise<void> {
        if (this.stops.find(s => s.stop_id === stop.stop_id)) {
            throw new DuplicateEntryError(`Stop with ID ${stop.stop_id} already exists`)
        }
        this.stops.push(stop);
    }

    async updateStop(stop: Partial<Stop> & { stop_id: string }): Promise<void> {
        const index = this.stops.findIndex(s => s.stop_id === stop.stop_id);
        if (index === -1) {
            throw new EntryNotFoundError(`Stop with ID ${stop.stop_id} not found`)
        }
        this.stops[index] = { ...this.stops[index], ...stop };
    }

    async deleteStop(stopId: string): Promise<void> {
        const index = this.stops.findIndex(s => s.stop_id === stopId);
        if (index === -1) {
            throw new EntryNotFoundError(`Stop with ID ${stopId} not found`)
        }
        this.stops.splice(index, 1);
    }

    async clearAllStops(): Promise<void> {
        this.stops.length = 0;
    }


    private stopTimes: StopTime[] = [];

    async getAllStopTimes(): Promise<StopTime[]> {
        return this.stopTimes;
    }

    async getStopTime(tripId: string, stopSequence: number): Promise<StopTime | undefined> {
        return this.stopTimes.find(stopTime => stopTime.trip_id === tripId && stopTime.stop_sequence === stopSequence);
    }

    async getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        return this.stopTimes.filter(stopTime => stopTime.trip_id === tripId);
    }

    async addStopTime(stopTime: StopTime): Promise<void> {
        if (this.stopTimes.find(st => st.trip_id === stopTime.trip_id && st.stop_sequence === stopTime.stop_sequence)) {
            throw new DuplicateEntryError(`StopTime with trip ID ${stopTime.trip_id} and stop sequence ${stopTime.stop_sequence} already exists`)
        }
        this.stopTimes.push(stopTime);
    }

    async updateStopTime(stopTime: Partial<StopTime> & Pick<StopTime, "trip_id" | "stop_sequence">): Promise<void> {
        const index = this.stopTimes.findIndex(st => st.trip_id === stopTime.trip_id && st.stop_sequence === stopTime.stop_sequence);
        if (index === -1) {
            throw new EntryNotFoundError(`StopTime with trip ID ${stopTime.trip_id} and stop sequence ${stopTime.stop_sequence} not found`)
        }
        this.stopTimes[index] = { ...this.stopTimes[index], ...stopTime };
    }

    async deleteStopTime(tripId: string, stopSequence: number): Promise<void> {
        const index = this.stopTimes.findIndex(st => st.trip_id === tripId && st.stop_sequence === stopSequence);
        if (index === -1) {
            throw new EntryNotFoundError(`StopTime with trip ID ${tripId} and stop sequence ${stopSequence} not found`)
        }
        this.stopTimes.splice(index, 1);
    }

    async clearAllStopTimes(): Promise<void> {
        this.stopTimes.length = 0;
    }



    private trips: Trip[] = [];

    async getAllTrips(): Promise<Trip[]> {
        return this.trips;
    }

    async getTrip(tripId: string): Promise<Trip | undefined> {
        return this.trips.find(trip => trip.trip_id === tripId);
    }

    async getTripsByRouteId(routeId: string): Promise<Trip[]> {
        return this.trips.filter(trip => trip.route_id === routeId)
    }

    async getTripsByRouteAndServiceId(routeId: string, serviceId: string): Promise<Trip[]> {
        return this.trips.filter(trip => trip.route_id === routeId && trip.service_id === serviceId)
    }

    async addTrip(trip: Trip): Promise<void> {
        if (this.trips.find(t => t.trip_id === trip.trip_id)) {
            throw new DuplicateEntryError(`Trip with ID ${trip.trip_id} already exists`);
        }
        this.trips.push(trip);
    }

    async updateTrip(trip: Partial<Trip> & { trip_id: string }): Promise<void> {
        const index = this.trips.findIndex(t => t.trip_id === trip.trip_id);
        if (index === -1) {
            throw new EntryNotFoundError(`Trip with ID ${trip.trip_id} not found`)
        }
        this.trips[index] = { ...this.trips[index], ...trip };
    }

    async deleteTrip(tripId: string): Promise<void> {
        const index = this.trips.findIndex(t => t.trip_id === tripId);
        if (index === -1) {
            throw new EntryNotFoundError(`Trip with ID ${tripId} not found`)
        }
        this.trips.splice(index, 1);
    }

    async clearAllTrips(): Promise<void> {
        this.trips.length = 0;
    }

    async clearAll(): Promise<void> {
        await this.clearAllRoutes();
        await this.clearAllStops();
        await this.clearAllStopTimes();
        await this.clearAllTrips();
    }

    getTripsWithStopTimesByRouteId(routeId: string): Promise<Array<Trip & { stop_times: Array<StopTime> }>> {
        return Promise.resolve([]);
    }

}