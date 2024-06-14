export interface Shape {
    readonly shape_id: string;
    readonly shape_pt_lat: number;
    readonly shape_pt_lon: number;
    readonly shape_pt_sequence: number;
    readonly shape_dist_traveled?: number;
}