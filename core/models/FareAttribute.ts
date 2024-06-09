export interface FareAttribute {
    fare_id: string;
    price: number;
    currency_type: string;
    payment_method: number;
    transfers: number;
    transfer_duration?: number;
}