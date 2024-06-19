import {Calendar} from "../../../core/domain/entities/Calendar";

export interface CalendarRepository {

    getAllCalendars(): Promise<Calendar[]>;
    
    getCalendar(serviceId: string): Promise<Calendar | undefined>;
    
    addCalendar(calendar: Calendar): Promise<void>;
    
    updateCalendar(calendar: Partial<Calendar> & Pick<Calendar, "service_id">): Promise<void>;
    
    deleteCalendar(serviceId: string): Promise<void>;
    
    deleteAllCalendars(): Promise<void>;
}