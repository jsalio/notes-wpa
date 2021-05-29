import { DBSchema } from 'idb';
import { EventData } from './event-data';
import { Note } from './note';

export interface QuickNotesDb extends DBSchema {
    Notes: {
        value: Note;
        key: string;
        indexes: { 'by-name': string },
    };
    Events: {
        value: EventData;
        key: string;
    }
}