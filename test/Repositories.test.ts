import {Repositories} from "../backend/repositories/Repositories";
import {getRepositoriesImplementations} from "./Repositories.setup";

const repositoriesImplementations: Repositories[] = getRepositoriesImplementations();

describe.each(repositoriesImplementations)('Repositories', (repo) => {

    beforeEach(async () => {
        await repo.clearAll();
    });

    it('should clear all data', async () => {
        await repo.addRoute({
            route_id: '1',
            agency_id: 'A1',
            route_short_name: 'ShortName1',
            route_long_name: 'Long Name 1',
            route_type: 3,
        });
        await repo.addRoute({
            route_id: '2',
            agency_id: 'A2',
            route_short_name: 'ShortName2',
            route_long_name: 'Another Long Name',
            route_type: 3,
        });
        await repo.addStop({
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0
        });
        await repo.addStop({
            stop_id: '2',
            stop_name: 'Second Stop',
            stop_lat: 41.0,
            stop_lon: -76.0
        });
        await repo.addTrip({
            trip_id: '1',
            route_id: 'route1',
            service_id: 'service1',
            trip_headsign: 'Downtown',
            direction_id: 0,
            block_id: 'block1',
            shape_id: 'shape1'
        });
        await repo.addTrip({
            trip_id: '2',
            route_id: 'route2',
            service_id: 'service2',
            trip_headsign: 'Uptown',
            direction_id: 1,
            block_id: 'block2',
            shape_id: 'shape2'
        });
        await repo.addStopTime({
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        });
        await repo.addStopTime({
            stop_id: '2',
            trip_id: 'trip1',
            arrival_time: '09:00:00',
            departure_time: '09:05:00',
            stop_sequence: 2
        });
        expect(await repo.getAllRoutes()).toHaveLength(2);
        expect(await repo.getAllStops()).toHaveLength(2);
        expect(await repo.getAllTrips()).toHaveLength(2);
        expect(await repo.getAllStopTimes()).toHaveLength(2);
        await repo.clearAll();
        expect(await repo.getAllRoutes()).toHaveLength(0);
        expect(await repo.getAllStops()).toHaveLength(0);
        expect(await repo.getAllTrips()).toHaveLength(0);
        expect(await repo.getAllStopTimes()).toHaveLength(0);
    });

});
