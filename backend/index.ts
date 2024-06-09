import mongoose from "mongoose";
import {MongoDBRepositories} from "./mongodb/MongoDBRepositories";
import * as process from "node:process";
import {Repositories} from "./repositories/Repositories";

const mongoDBUrl = "mongodb://192.168.2.155:27017";

async function main(): Promise<void> {
    await mongoose.connect(mongoDBUrl, {
        user: "root",
        pass: "goodExample",
        dbName: "bus_system"
    })
    console.log(`Successfully connected to MongoDB at ${mongoDBUrl}`)
    const repository: Repositories = new MongoDBRepositories();
    // const routes = await repository.getAllRoutes();
    // routes.forEach((route) => {
    //     console.log(route)
    // })
    const stops = await repository.getAllStops();
    stops.forEach((stop) => {
        console.log(stop)
    })
    await mongoose.disconnect();
}

main().then().catch((err) => {
    console.log(err)
})