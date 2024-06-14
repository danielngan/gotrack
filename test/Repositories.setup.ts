import {Repositories} from "../backend/repositories/Repositories";
import {MockRepositories} from "./mock/MockRepositories";
import {MongoDBRepositories} from "../backend/repositories/mongodb/MongoDBRepositories";

const repositoriesImplementations: Repositories[] = [new MockRepositories(), new MongoDBRepositories()]

export function getRepositoriesImplementations(): Repositories[] {
    return repositoriesImplementations;
}
