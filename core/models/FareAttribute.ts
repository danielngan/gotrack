export interface FareAttribute {
    readonly fare_id: string;
    readonly price: number;
    readonly currency_type: string;
    readonly payment_method: number;
    readonly transfers: number;
    readonly transfer_duration?: number;
}