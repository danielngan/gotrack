import {CalendarRepository} from "../../application/repositories/CalendarRepository";
import {
    addEntry,
    defineSchema, deleteEntry, deleteManyEntries,
    findManyEntries, findOneEntry,
    onDeleteNotFound,
    onDuplicateEntry,
    onUpdateNotFound,
    toObject,
    toObjects, updateEntry
} from "./MongoDBUtils";
import {Calendar} from "../../../core/domain/entities/Calendar";
import {ServiceAvailable} from "../../../core/domain/types/ServiceAvailable";

export const [ CalendarSchema, CalendarModel ] = defineSchema<Calendar>("Calendar", {
        service_id: { type: String, required: true, index: true, unique: true},
        monday: { type: Number, enum: ServiceAvailable, required: true },
        tuesday: { type: Number, enum: ServiceAvailable, required: true },
        wednesday: { type: Number, enum: ServiceAvailable, required: true },
        thursday: { type: Number, enum: ServiceAvailable, required: true },
        friday: { type: Number, enum: ServiceAvailable, required: true },
        saturday: { type: Number, enum: ServiceAvailable, required: true },
        sunday: { type: Number, enum: ServiceAvailable, required: true },
        start_date: { type: String, required: true },
        end_date: { type: String, required: true }
    }
)

export class MongoDBCalendarRepository implements CalendarRepository {
    
    async getAllCalendars(): Promise<Calendar[]> {
        return await findManyEntries(CalendarModel, {})
    }

    async getCalendar(serviceId: string): Promise<Calendar | undefined> {
        return await findOneEntry(CalendarModel, {service_id: serviceId})
    }

    async addCalendar(calendar: Calendar): Promise<void> {
        await addEntry(CalendarModel, calendar, {service_id: calendar.service_id})
    }

    async updateCalendar(calendar: Partial<Calendar> & Pick<Calendar, "service_id">): Promise<void> {
        await updateEntry(CalendarModel, calendar, {service_id: calendar.service_id})
    }

    async deleteCalendar(serviceId: string): Promise<void> {
        await deleteEntry(CalendarModel, {service_id: serviceId})
    }

    async deleteAllCalendars(): Promise<void> {
        await deleteManyEntries(CalendarModel, {})
    }
}