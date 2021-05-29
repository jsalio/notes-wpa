import { EventData } from "../../models/Db/event-data";
import { Note } from "../../models/Db/note";
import { EntityContexts } from "./contexts";

export class EventContext {
    table: string;
    context: EntityContexts;
    /**
     *
     */
    constructor() {
        this.table = 'Events';
        this.context = new EntityContexts()
    }

    public getAllEvents(): Promise<Note[]> {
        return this.context.getAll(this.table)
    }

    public geEventByKey(key: string): Promise<Note> {
        return this.context.get(this.table, key)
    }

    public addEvent(event: EventData): Promise<any> {
        return this.context.set(this.table, event.EventName, event)
    }
    public deleteEvent(key: string): Promise<void> {
        return this.context.del(this.table, key)
    }

    public cleanAllEvents(): Promise<void> {
        return this.context.clear(this.table)
    }

    public getAllEventsKey(): Promise<any[]> {
        return this.context.keys(this.table)
    }

}