import mongoose, {
    Document,
    FlatRecord,
    Model,
    Schema,
    SchemaDefinition,
    SchemaDefinitionType,
    SchemaOptions
} from "mongoose";
import {EntryNotFoundError} from "../../../core/application/exceptions/EntryNotFoundError";
import {DeleteResult, MongoError, UpdateResult} from "mongodb";
import {DuplicateEntryError} from "../../../core/application/exceptions/DuplicateEntryError";

export function defaultSchemaOptions<T>(): SchemaOptions<FlatRecord<T>> {
    return {
        versionKey: false,
        toObject: {
            transform: (_: Document, ret: Record<string, any>) => {
                delete ret._id
            }
        }
    }
}

export function defineSchema<T>(name: string, definition: SchemaDefinition<SchemaDefinitionType<T>, T>): [Schema<T>, Model<T>] {
    const schema: Schema<T> = new Schema<T>(definition, defaultSchemaOptions());
    const model: Model<T> = mongoose.model<T>(name, schema);
    return [schema, model]
}

export function toObject<T>(document: Document<unknown, {}, T> | null): T | undefined {
    return document?.toObject() ?? undefined
}

export function toObjectRequired<T>(document: Document<unknown, {}, T>): T {
    return document.toObject()
}

export function toObjects<T>(documents: Document<unknown, {}, T>[]): T[] {
    return documents.map(document => document.toObject())
}

export function onUpdateNotFound<T>(model: Model<T>, key: {}): (result: UpdateResult) => void {
    return (result: UpdateResult) => {
        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            throw new EntryNotFoundError(`Entry ${model.name} with key: ${JSON.stringify(key)} not found`)
        }
    }
}

export function onDeleteNotFound<T>(model: Model<T>, key: {}): (result: DeleteResult) => void {
    return (result: DeleteResult) => {
        if (result.deletedCount === 0) {
            throw new EntryNotFoundError(`Entry ${model.name} with key: ${JSON.stringify(key)} not found`)
        }
    }
}

export function onDuplicateEntry<T>(model: Model<T>, key: {}): (error: Error) => void {
    return (error: Error) => {
        if (error instanceof MongoError && error.code === 11000 /* DuplicateEntry */) {
            throw new DuplicateEntryError(`Entry ${model.name} with key: ${JSON.stringify(key)} already exists`);
        }
        throw error;
    }
}

export async function addEntry<T>(model: Model<T>, entry: T, key: {}): Promise<void> {
    await model.create(entry).then().catch(onDuplicateEntry(model, key))
}

export async function updateEntry<T>(model: Model<T>, entry: Partial<T>, key: {}): Promise<void> {
    await model.updateOne(key, {$set: entry}).exec().then(onUpdateNotFound(model, key))
}

export async function deleteEntry<T>(model: Model<T>, key: {}): Promise<void> {
    await model.deleteOne(key).exec().then(onDeleteNotFound(model, key))
}

export async function findOneEntry<T>(model: Model<T>, filter: {}): Promise<T | undefined> {
    return await model.findOne(filter).exec().then(toObject)
}

export async function findManyEntries<T>(model: Model<T>, filter: {}): Promise<T[]> {
    return await model.find(filter).exec().then(toObjects)
}

export async function deleteManyEntries<T>(model: Model<T>, filter: {}): Promise<void> {
    await model.deleteMany(filter).exec();
}
