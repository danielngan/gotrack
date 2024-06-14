export interface FareRule {
    readonly fare_id: string;
    readonly route_id?: string;
    readonly origin_id?: string;
    readonly destination_id?: string;
}