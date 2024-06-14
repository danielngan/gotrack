export interface Agency {
    readonly agency_id: string;
    readonly agency_name: string;
    readonly agency_url: string;
    readonly agency_timezone: string;
    readonly agency_lang?: string;
    readonly agency_phone?: string;
    readonly agency_fare_url?: string;
    readonly agency_email?: string;
}