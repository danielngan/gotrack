import {Repositories} from "../backend/application/repositories/Repositories";
import {MockRepositories} from "./mock/MockRepositories";
import {MongoDBRepositories} from "../backend/infrastructure/mongodb/MongoDBRepositories";

const repositoriesImplementations: Repositories[] = [new MockRepositories(), new MongoDBRepositories()]

export function getRepositoriesImplementations(): Repositories[] {
    return repositoriesImplementations;
}
