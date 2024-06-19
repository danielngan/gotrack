import {ServiceAvailable} from "../types/ServiceAvailable";

export interface Calendar {
    readonly service_id: string;
    readonly monday: ServiceAvailable;
    readonly tuesday: ServiceAvailable;
    readonly wednesday: ServiceAvailable;
    readonly thursday: ServiceAvailable;
    readonly friday: ServiceAvailable;
    readonly saturday: ServiceAvailable;
    readonly sunday: ServiceAvailable;
    readonly start_date: string;
    readonly end_date: string;
}