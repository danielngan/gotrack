import mongoose from "mongoose";
import {MongoDBRepositories} from "./repositories/mongodb/MongoDBRepositories";
import {Repositories} from "./repositories/Repositories";
import {ExpressServer} from "./infrastructure/ExpressServer";
import {UseCaseInteractor} from "./interactors/UseCaseInteractor";
import {QueryAllRoutesInteractor} from "./interactors/QueryAllRoutesInteractor";
import {QueryAllStopsInteractor} from "./interactors/QueryAllStopsInteractor";

const mongoDBUrl = "mongodb://192.168.2.155:27017";

async function main(): Promise<void> {
    mongoose.set('debug', true);
    await mongoose.connect(mongoDBUrl, {
        user: "root",
        pass: "goodExample",
        dbName: "go",
        autoIndex: true,
    })
    console.log(`Successfully connected to MongoDB at ${mongoDBUrl}`)
    const repositories: Repositories = new MongoDBRepositories();
    const interactors: UseCaseInteractor[] = [
        new QueryAllRoutesInteractor(repositories),
        new QueryAllStopsInteractor(repositories)
    ]
    const server = new ExpressServer(interactors);
    server.start(3000);
}

main().then().catch((err) => {
    console.log(err)
})