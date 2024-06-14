import {StopTime} from "../core/domain/entities/StopTime";
import {EntryNotFoundError} from "../core/application/exceptions/EntryNotFoundError";
import {getRepositoriesImplementations} from "./Repositories.setup";
import {Repositories} from "../backend/application/repositories/Repositories";
import {DuplicateEntryError} from "../core/application/exceptions/DuplicateEntryError";

const repositoriesImplementations: Repositories[] = getRepositoriesImplementations();

describe.each(repositoriesImplementations)('StopTimeRepository Interface', (repo) => {

    beforeEach(async () => {
        await repo.clearAllStopTimes()
    });

    it('should add and retrieve a stop time', async () => {
        const stopTime: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        await repo.addStopTime(stopTime);
        const retrievedStopTime = await repo.getStopTimeById('1', 'trip1');
        expect(retrievedStopTime).toEqual(stopTime);
    });

    it('should throw error when adding a duplicate stop time', async () => {
        const stopTime: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        await repo.addStopTime(stopTime);
        await expect(repo.addStopTime(stopTime)).rejects.toThrow(DuplicateEntryError);
    });

    it('should update a stop time', async () => {
        const stopTime: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        await repo.addStopTime(stopTime);
        await repo.updateStopTime({ stop_id: '1', trip_id: 'trip1', arrival_time: '08:10:00' });
        const updatedStopTime = await repo.getStopTimeById('1', 'trip1');
        expect(updatedStopTime?.arrival_time).toBe('08:10:00');
    });

    it('should throw error when updating a non-existent stop time', async () => {
        await expect(repo.updateStopTime({ stop_id: '1', trip_id: 'trip1', arrival_time: '08:10:00' })).rejects.toThrow(EntryNotFoundError);
    });

    it('should delete a stop time', async () => {
        const stopTime: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        await repo.addStopTime(stopTime);
        await repo.deleteStopTime('1', 'trip1');
        const deletedStopTime = await repo.getStopTimeById('1', 'trip1');
        expect(deletedStopTime).toBeUndefined();
    });

    it('should throw error when deleting a non-existent stop time', async () => {
        await expect(repo.deleteStopTime('1', 'trip1')).rejects.toThrow(EntryNotFoundError);
    });

    it('should retrieve stop times by trip ID', async () => {
        const stopTime1: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        const stopTime2: StopTime = {
            stop_id: '2',
            trip_id: 'trip1',
            arrival_time: '09:00:00',
            departure_time: '09:05:00',
            stop_sequence: 2
        };
        const stopTime3: StopTime = {
            stop_id: '3',
            trip_id: 'trip2',
            arrival_time: '10:00:00',
            departure_time: '10:05:00',
            stop_sequence: 1
        };
        await repo.addStopTime(stopTime1);
        await repo.addStopTime(stopTime2);
        await repo.addStopTime(stopTime3);
        const stopTimesInTrip1 = await repo.getStopTimesByTripId('trip1');
        expect(stopTimesInTrip1).toHaveLength(2);
        expect(stopTimesInTrip1).toEqual(expect.arrayContaining([stopTime1, stopTime2]));
    });

    it('should clear all stop times', async () => {
        const stopTime: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        await repo.addStopTime(stopTime);
        await repo.clearAllStopTimes();
        const allStopTimes = await repo.getAllStopTimes();
        expect(allStopTimes).toHaveLength(0);
    });

    it('should search stop times by stop ID', async () => {
        const stopTime1: StopTime = {
            stop_id: '1',
            trip_id: 'trip1',
            arrival_time: '08:00:00',
            departure_time: '08:05:00',
            stop_sequence: 1
        };
        const stopTime2: StopTime = {
            stop_id: '1',
            trip_id: 'trip2',
            arrival_time: '09:00:00',
            departure_time: '09:05:00',
            stop_sequence: 2
        };
        await repo.addStopTime(stopTime1);
        await repo.addStopTime(stopTime2);
        const searchResults = await repo.getStopTimesByStopId('1');
        expect(searchResults).toHaveLength(2);
        expect(searchResults).toEqual(expect.arrayContaining([stopTime1, stopTime2]));
    });
});
