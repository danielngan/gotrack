import {CalendarDate} from "../../../core/domain/entities/CalendarDate";

export interface CalendarDateRepository {

    getAllCalendarDates(): Promise<CalendarDate[]>;

    getCalendarDate(serviceId: string, date: string): Promise<CalendarDate | undefined>;

    getCalendarDatesByServiceId(serviceId: string): Promise<CalendarDate[]>;

    addCalendarDate(calendarDate: CalendarDate): Promise<void>;

    updateCalendarDate(calendarDate: Partial<CalendarDate> & Pick<CalendarDate, "service_id" | "date">): Promise<void>;

    deleteCalendarDate(serviceId: string, date: string): Promise<void>;

    deleteCalendarDatesByServiceId(serviceId: string): Promise<void>;

    deleteAllCalendarDates(): Promise<void>;
}