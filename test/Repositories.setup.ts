import {Repositories} from "../backend/application/repositories/Repositories";
import {MockRepositories} from "./mock/MockRepositories";
import {MongoDBRepositories} from "../backend/infrastructure/mongodb/MongoDBRepositories";

export const RepositoriesImplementations: Repositories[] = [new MockRepositories(), new MongoDBRepositories()]

export async function ensureMongoDBIndexes(): Promise<void> {
    for (const repo of RepositoriesImplementations) {
        if (repo instanceof MongoDBRepositories) {
            await repo.ensureIndexes();
        }
    }
}
