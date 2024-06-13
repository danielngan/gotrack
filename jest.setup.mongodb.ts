import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {MongoDBRepositories} from "./backend/repositories/mongodb/MongoDBRepositories";
import {setRepositories} from "./test/RepositoriesSetup";

const mongoDBServer = new MongoMemoryServer();

beforeAll(async () => {
    setRepositories(new MongoDBRepositories());
    await mongoDBServer.start();
    console.log("Started MongoDB server");
    await mongoose.connect(mongoDBServer.getUri(), {
        dbName: "bus_system",
        autoIndex: true,
    });
    console.log(`Connected to MongoDB server: ${mongoDBServer.getUri()}`);
});

afterAll(async () => {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB server");
    await mongoDBServer.stop();
    console.log("Stopped MongoDB server\n");
});
