import {Shape} from "../../../core/domain/entities/Shape";

export interface ShapeRepository {

    getAllShapes(): Promise<Shape[]>;

    getShape(shapeId: string, shapePtSequence: number): Promise<Shape | undefined>;

    getShapesByShapeId(shapeId: string): Promise<Shape[]>;

    addShape(shape: Shape): Promise<void>;

    updateShape(shape: Partial<Shape> & Pick<Shape, "shape_id" | "shape_pt_sequence">): Promise<void>;

    deleteShape(shapeId: string, shapePtSequence: number): Promise<void>;

    deleteShapesByShapeId(shapeId: string): Promise<void>;

    deleteAllShapes(): Promise<void>;
}