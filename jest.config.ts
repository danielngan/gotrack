import {JestConfigWithTsJest} from "ts-jest";

export default <JestConfigWithTsJest> {
    preset: 'ts-jest',
    maxConcurrency: 1,
    maxWorkers: 1,
    setupFilesAfterEnv: ['./jest.setup.mock.ts'],
}
