import {CalendarDateRepository} from "../../application/repositories/CalendarDateRepository";
import {
    addEntry,
    defineSchema,
    deleteEntry,
    deleteManyEntries,
    findManyEntries,
    findOneEntry,
    updateEntry
} from "./MongoDBUtils";
import {CalendarDate} from "../../../core/domain/entities/CalendarDate";

export const [CalendarDateSchema, CalendarDateModel] = defineSchema<CalendarDate>("Calendar_Date", {
    service_id: { type: String, required: true, index: true, unique: false},
    date: { type: String, required: true},
    exception_type: { type: Number, required: true }
})

CalendarDateSchema.index({service_id: 1, date: 1}, {unique: true})

export class MongoDBCalendarDateRepository implements CalendarDateRepository {

    async getAllCalendarDates(): Promise<CalendarDate[]> {
        return await findManyEntries(CalendarDateModel, {})
    }

    async getCalendarDate(serviceId: string, date: string): Promise<CalendarDate | undefined> {
        return await findOneEntry(CalendarDateModel, {service_id: serviceId, date: date})
    }

    async getCalendarDatesByServiceId(serviceId: string): Promise<CalendarDate[]> {
        return await findManyEntries(CalendarDateModel, {service_id: serviceId})
    }

    async addCalendarDate(calendarDate: CalendarDate): Promise<void> {
        return await addEntry(CalendarDateModel, calendarDate, {service_id: calendarDate.service_id, date: calendarDate.date})
    }

    async updateCalendarDate(calendarDate: Partial<CalendarDate> & Pick<CalendarDate, "service_id" | "date">): Promise<void> {
        return await updateEntry(CalendarDateModel, calendarDate, {service_id: calendarDate.service_id, date: calendarDate.date})
    }

    async deleteAllCalendarDates(): Promise<void> {
        await deleteManyEntries(CalendarDateModel, {})
    }

    async deleteCalendarDate(serviceId: string, date: string): Promise<void> {
        await deleteEntry(CalendarDateModel, {service_id: serviceId, date: date})
    }

    async deleteCalendarDatesByServiceId(serviceId: string): Promise<void> {
        await deleteManyEntries(CalendarDateModel, {service_id: serviceId})
    }

}