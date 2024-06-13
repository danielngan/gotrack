import {Repositories} from "../backend/repositories/Repositories";

let repositories: Repositories;

export function setRepositories(repo: Repositories): void {
    repositories = repo;
}

export function getRepositories(): Repositories {
    return repositories ?? (() => {throw new Error("Repositories not set")})();
}
