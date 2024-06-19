import {
    addEntry,
    defineSchema,
    deleteEntry,
    deleteManyEntries,
    findManyEntries,
    findOneEntry,
    updateEntry
} from "./MongoDBUtils";
import {Shape} from "../../../core/domain/entities/Shape";
import {ShapeRepository} from "../../application/repositories/ShapeRepository";

export const [ShapeSchema, ShapeModel] = defineSchema<Shape>("Shape", {
    shape_id: { type: String, required: true },
    shape_pt_sequence: { type: Number, required: true },
    shape_pt_lat: { type: Number, required: true },
    shape_pt_lon: { type: Number, required: true },
    shape_dist_traveled: Number
})

ShapeSchema.index({shape_id: 1, shape_pt_sequence: 1}, {unique: true})

export class MongoDBShapeRepository implements ShapeRepository {
    
    async getAllShapes(): Promise<Shape[]> {
        return findManyEntries(ShapeModel, {})
    }
    
    async getShape(shapeId: string, sequence: number): Promise<Shape | undefined> {
        return findOneEntry(ShapeModel, {shape_id: shapeId, shape_pt_sequence: sequence})
    }
    
    async getShapesByShapeId(shapeId: string): Promise<Shape[]> {
        return findManyEntries(ShapeModel, {shape_id: shapeId})
    }
    
    async addShape(shape: Shape): Promise<void> {
        await addEntry(ShapeModel, shape, {shape_id: shape.shape_id, shape_pt_sequence: shape.shape_pt_sequence})
    }

    async updateShape(shape: Partial<Shape> & Pick<Shape, "shape_id" | "shape_pt_sequence">): Promise<void> {
        await updateEntry(ShapeModel, shape, {shape_id: shape.shape_id, shape_pt_sequence: shape.shape_pt_sequence})
    }
    
    async deleteShape(shapeId: string, sequence: number): Promise<void> {
        await deleteEntry(ShapeModel, {shape_id: shapeId, shape_pt_sequence: sequence})
    }
    
    async deleteShapesByShapeId(shapeId: string): Promise<void> {
        await deleteManyEntries(ShapeModel, {shape_id: shapeId})
    }

    async deleteAllShapes(): Promise<void> {
        await deleteManyEntries(ShapeModel, {})
    }
}