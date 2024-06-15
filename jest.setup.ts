import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {ensureMongoDBIndexes} from "./test/Repositories.setup";

const mongoDBServer = new MongoMemoryServer();

beforeAll(async () => {
    await mongoDBServer.start().then(logMongoDBStarted);
    await mongoose.connect(mongoDBServer.getUri(), {dbName: "go"}).then(logMonDBServerConnected);
    await ensureMongoDBIndexes().then(logMongoDBIndexesEnsured);
});

afterAll(async () => {
    await mongoose.disconnect().then(logMongoDBDisconnected);
    await mongoDBServer.stop().then(logMongoDBStopped);
});

function logMongoDBStarted() {
    console.log("Started MongoDB server");
}

function logMonDBServerConnected() {
    console.log(`Connected to MongoDB server: ${mongoDBServer.getUri()}`);
}

function logMongoDBStopped() {
    console.log("Stopped MongoDB server");
}

function logMongoDBDisconnected() {
    console.log("Disconnected from MongoDB server");
}

function logMongoDBIndexesEnsured() {
    console.log("Ensured MongoDB indexes");
}