import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

const mongoDBServer = new MongoMemoryServer();

beforeAll(async () => {
    await mongoDBServer.start();
    console.log("Started MongoDB server");
    await mongoose.connect(mongoDBServer.getUri(), {
        dbName: "go",
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
