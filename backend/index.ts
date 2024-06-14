import mongoose from "mongoose";
import {MongoDBRepositories} from "./infrastructure/mongodb/MongoDBRepositories";
import {Repositories} from "./application/repositories/Repositories";
import {ExpressServer} from "./infrastructure/express/ExpressServer";
import {UseCaseInteractor} from "./application/usecases/UseCaseInteractor";
import {QueryAllRoutesInteractor} from "./application/usecases/QueryAllRoutesInteractor";
import {QueryAllStopsInteractor} from "./application/usecases/QueryAllStopsInteractor";

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