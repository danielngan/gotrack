import {Trip} from "../core/domain/entities/Trip";
import {EntryNotFoundError} from "../core/application/exceptions/EntryNotFoundError";
import {RepositoriesImplementations} from "./Repositories.setup";
import {DuplicateEntryError} from "../core/application/exceptions/DuplicateEntryError";

describe.each(RepositoriesImplementations)('TripRepository Interface', (repo) => {

    beforeEach(async () => {
        await repo.clearAllTrips()
    });

    it('should add and retrieve a trip', async () => {
        const trip: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        await repo.addTrip(trip);
        const retrievedTrip = await repo.getTripById('1');
        expect(retrievedTrip).toEqual(trip);
    });

    it('should throw error when adding a duplicate trip', async () => {
        const trip: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        await repo.addTrip(trip);
        await expect(repo.addTrip(trip)).rejects.toThrow(DuplicateEntryError);
    });

    it('should update a trip', async () => {
        const trip: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        await repo.addTrip(trip);
        await repo.updateTrip({ trip_id: '1', trip_headsign: 'Uptown' });
        const updatedTrip = await repo.getTripById('1');
        expect(updatedTrip?.trip_headsign).toBe('Uptown');
    });

    it('should throw error when updating a non-existent trip', async () => {
        await expect(repo.updateTrip({ trip_id: '1', trip_headsign: 'Uptown' })).rejects.toThrow(EntryNotFoundError);
    });

    it('should delete a trip', async () => {
        const trip: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        await repo.addTrip(trip);
        await repo.deleteTrip('1');
        const deletedTrip = await repo.getTripById('1');
        expect(deletedTrip).toBeUndefined();
    });

    it('should throw error when deleting a non-existent trip', async () => {
        await expect(repo.deleteTrip('1')).rejects.toThrow(EntryNotFoundError);
    });

    it('should retrieve all trips', async () => {
        const trip1: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        const trip2: Trip = {
            trip_id: '2',
            route_id: 'route2',
            service_id: 'service2',
            trip_headsign: 'Uptown',
            direction_id: 1,
            block_id: 'block2',
            shape_id: 'shape2'
        };
        await repo.addTrip(trip1);
        await repo.addTrip(trip2);
        const allTrips = await repo.getAllTrips();
        expect(allTrips).toHaveLength(2);
        expect(allTrips).toEqual(expect.arrayContaining([trip1, trip2]));
    });

    it('should retrieve trips by route ID', async () => {
        const trip1: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        const trip2: Trip = {
            trip_id: '2',
            route_id: 'route2',
            service_id: 'service2',
            trip_headsign: 'Uptown',
            direction_id: 1,
            block_id: 'block2',
            shape_id: 'shape2'
        };
        const trip3: Trip = {
            trip_id: '3',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        }
        await repo.addTrip(trip1);
        await repo.addTrip(trip2);
        await repo.addTrip(trip3);
        const trips = await repo.getTripsByRouteId('route1');
        expect(trips).toHaveLength(2);
        expect(trips).toContainEqual(trip1);
        expect(trips).toContainEqual(trip3);
    });

    it('should retrieve trips by service ID', async () => {
        const trip1: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        const trip2: Trip = {
            trip_id: '2',
            route_id: 'route2',
            service_id: 'service1',
            trip_headsign: 'Uptown',
            direction_id: 1,
            block_id: 'block2',
            shape_id: 'shape2'
        };
        const trip3: Trip = {
            trip_id: '3',
            route_id: 'route1',
            service_id: 'service2',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        }
        await repo.addTrip(trip1);
        await repo.addTrip(trip2);
        await repo.addTrip(trip3);
        const trips = await repo.getTripsByServiceId('service1');
        expect(trips).toHaveLength(2);
        expect(trips).toContainEqual(trip1);
        expect(trips).toContainEqual(trip2);
    });

    it('should clear all trips', async () => {
        const trip: Trip = {
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        };
        await repo.addTrip(trip);
        await repo.clearAllTrips();
        const allTrips = await repo.getAllTrips();
        expect(allTrips).toHaveLength(0);
    });
});
