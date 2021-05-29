
import { Note } from "../../models/Db/note";
import { EntityContexts } from "./contexts";

export class NoteContext {
    table: string;
    context: EntityContexts;
    /**
     *
     */
    constructor() {
        this.table = 'Notes';
        this.context = new EntityContexts()
    }

    public getAllNote(): Promise<Note[]> {
        return this.context.getAll(this.table)
    }

    public geNoteByKey(key: string): Promise<Note> {
        return this.context.get(this.table, key)
    }

    public addNote(key: string, note: Note): Promise<any> {
        return this.context.set(this.table, key, note)
    }
    public deleteNote(key: string): Promise<void> {
        return this.context.del(this.table, key)
    }

    public cleanAllNote(): Promise<void> {
        return this.context.clear(this.table)
    }

    public getAllNoteKey(): Promise<any[]> {
        return this.context.keys(this.table)
    }

}