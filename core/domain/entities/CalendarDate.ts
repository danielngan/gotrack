import {ServiceExceptionType} from "../types/ServiceExceptionType";

export interface CalendarDate {
    readonly service_id: string;
    readonly date: string;
    readonly exception_type: ServiceExceptionType;
}

