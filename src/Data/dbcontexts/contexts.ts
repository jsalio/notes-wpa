import { IDBPDatabase, openDB } from "idb";
import { QuickNotesDb } from "../../models/Db/schema";


export class EntityContexts {
    context: any;
    /**
     *
     */
    constructor() {
        this.createDbContext();
    }

    private createDbContext() {
        this.context = openDB<QuickNotesDb>('notes-db', 1, {
            upgrade(db) {
                const noteStore = db.createObjectStore('Notes');
                db.createObjectStore('Events', { autoIncrement: true });
                noteStore.createIndex('by-name', 'name');
            }
        });
    }

    public async get(table: any, key: string) {
        return (await (await this.context as Promise<IDBPDatabase<QuickNotesDb>>)).get(table, key)
    }

    public async getAll(table: any) {
        return (await (await this.context as Promise<IDBPDatabase<QuickNotesDb>>)).getAll(table)
    }

    public async set(table: any, key: string, value: any) {
        return (await (await this.context as Promise<IDBPDatabase<QuickNotesDb>>)).put(table, value, key)
    }

    public async del(table: any, key: string) {
        return (await (await this.context as Promise<IDBPDatabase<QuickNotesDb>>)).delete(table, key)
    }

    public async clear(table: any) {
        return (await (await this.context as Promise<IDBPDatabase<QuickNotesDb>>)).clear(table)
    }

    public async keys(table: any) {
        return (await (await this.context as Promise<IDBPDatabase<QuickNotesDb>>)).getAllKeys(table)
    }

}