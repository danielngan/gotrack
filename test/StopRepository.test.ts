import {Stop} from "../core/domain/entities/Stop";
import {EntryNotFoundError} from "../core/application/exceptions/EntryNotFoundError";
import {getRepositoriesImplementations} from "./Repositories.setup";
import {Repositories} from "../backend/application/repositories/Repositories";
import {DuplicateEntryError} from "../core/application/exceptions/DuplicateEntryError";

const repositoriesImplementations: Repositories[] = getRepositoriesImplementations();

describe.each(repositoriesImplementations)('StopRepository Interface', (repo) => {

    beforeEach(async () => {
        await repo.clearAllStops()
    });

    it('should add and retrieve a stop', async () => {
        const stop: Stop = {
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0
        };
        await repo.addStop(stop);
        const retrievedStop = await repo.getStopById('1');
        expect(retrievedStop).toEqual(stop);
    });

    it('should throw error when adding a duplicate stop', async () => {
        const stop: Stop = {
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0
        };
        await repo.addStop(stop);
        await expect(repo.addStop(stop)).rejects.toThrow(DuplicateEntryError);
    });

    it('should update a stop', async () => {
        const stop: Stop = {
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0
        };
        await repo.addStop(stop);
        await repo.updateStop({ stop_id: '1', stop_name: 'Updated Stop' });
        const updatedStop = await repo.getStopById('1');
        expect(updatedStop?.stop_name).toBe('Updated Stop');
    });

    it('should throw error when updating a non-existent stop', async () => {
        await expect(repo.updateStop({ stop_id: '1', stop_name: 'Updated Stop' })).rejects.toThrow(EntryNotFoundError);
    });

    it('should delete a stop', async () => {
        const stop: Stop = {
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0
        };
        await repo.addStop(stop);
        await repo.deleteStop('1');
        const deletedStop = await repo.getStopById('1');
        expect(deletedStop).toBeUndefined();
    });

    it('should throw error when deleting a non-existent stop', async () => {
        await expect(repo.deleteStop('1')).rejects.toThrow(EntryNotFoundError);
    });

    it('should retrieve stops by zone ID', async () => {
        const stop1: Stop = {
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0,
            zone_id: 'A1'
        };
        const stop2: Stop = {
            stop_id: '2',
            stop_name: 'Second Stop',
            stop_lat: 41.0,
            stop_lon: -76.0,
            zone_id: 'A1'
        };
        const stop3: Stop = {
            stop_id: '3',
            stop_name: 'Third Stop',
            stop_lat: 42.0,
            stop_lon: -77.0,
            zone_id: 'B2'
        };
        await repo.addStop(stop1);
        await repo.addStop(stop2);
        await repo.addStop(stop3);
        const stopsInZoneA1 = await repo.getStopsByZoneId('A1');
        expect(stopsInZoneA1).toHaveLength(2);
        expect(stopsInZoneA1).toEqual(expect.arrayContaining([stop1, stop2]));
    });

    it('should clear all stops', async () => {
        const stop: Stop = {
            stop_id: '1',
            stop_name: 'First Stop',
            stop_lat: 40.0,
            stop_lon: -75.0
        };
        await repo.addStop(stop);
        await repo.clearAllStops();
        const allStops = await repo.getAllStops();
        expect(allStops).toHaveLength(0);
    });

    it('should search stops by name pattern', async () => {
        const stop1: Stop = {
            stop_id: '1',
            stop_name: 'Main St',
            stop_lat: 40.0,
            stop_lon: -75.0
        };
        const stop2: Stop = {
            stop_id: '2',
            stop_name: 'First Ave',
            stop_lat: 41.0,
            stop_lon: -76.0
        };
        await repo.addStop(stop1);
        await repo.addStop(stop2);
        const searchResults = await repo.searchStopsByName('Main');
        expect(searchResults).toHaveLength(1);
        expect(searchResults).toEqual(expect.arrayContaining([stop1]));
    });
});
