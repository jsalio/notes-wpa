import { getAllNote, geNoteByKey, addNote, deleteNote, updateNote } from '../apis/note.api';
import { NoteContext } from '../dbcontexts/Note.contextt';
import { EventContext } from '../dbcontexts/Request.context';
import { Note } from '../models/Db/note';

export const ProxyGetAllNote = (isConnected: boolean): Promise<Note[]> => {
    const dataContext = new NoteContext();
    if (isConnected) {
        return getAllNote()
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject(response.statusText)
                }
            })
            .then((result) => {
                return resolveGetNotes(dataContext, result)
            })
            .catch(err => {
                console.log('Error on request', err);
                return dataContext.getAllNote()
            })
    } else {
        return dataContext.getAllNote()
    }
}

export const ProxyGetNote = (isConnected: boolean, key: string): Promise<Note> => {
    const dataContext = new NoteContext();
    if (isConnected) {
        return geNoteByKey(key)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Promise.reject(response.statusText)
                }
            })
            .then((dataRow) => {
                return ResolveGetNote(dataContext, key, dataRow);
            })
            .catch((err) => {
                console.log('Error on request', err);
                return dataContext.geNoteByKey(key)
            })
    } else {
        return dataContext.geNoteByKey(key)
    }
}

export const ProxyAddNote = (isConnected: boolean, note: Note): Promise<any> => {
    const dataContext = new NoteContext();
    const eventContext = new EventContext();
    if (isConnected) {
        return addNote(note)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Promise.reject(response.statusText)
                }
            })
            .then(() => {
                console.log('Saved on server')
            })
            .catch((err) => {
                const eventName = new Date().toDateString() + '_AddNote_' + note.name
                return eventContext.addEvent({ EventName: eventName, promise: addNote(note) }).then(() => {
                    return dataContext.addNote(note.id, note)
                })
            })
    } else {
        const eventName = new Date().toDateString() + '_AddNote_' + note.name
        return eventContext.addEvent({ EventName: eventName, promise: addNote(note) }).then(() => {
            return dataContext.addNote(note.id, note)
        })
    }
}


export const ProxyUpdateNote = (isConnected: boolean, key: string, note: Note): Promise<any> => {
    const dataContext = new NoteContext();
    const eventContext = new EventContext();
    if (isConnected) {
        return updateNote(key, note)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Promise.reject(response.statusText)
                }
            })
            .then(() => {
                console.log('Saved on server')
            })
            .catch((err) => {
                const eventName = new Date().toDateString() + '_UpdateNote_' + note.name;
                return eventContext.addEvent({ EventName: eventName, promise: updateNote(key, note) }).then(() => {
                    return dataContext.addNote(note.id, note)
                })
            })
    } else {
        const eventName = new Date().toDateString() + '_UpdateNote_' + note.name;
        return eventContext.addEvent({ EventName: eventName, promise: updateNote(key, note) }).then(() => {
            return dataContext.addNote(note.id, note)
        })
    }
}

export const ProxyDeleteNote = (isConnected: boolean, key: string): Promise<any> => {
    const dataContext = new NoteContext();
    const eventContext = new EventContext();
    if (isConnected) {
        return deleteNote(key)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Promise.reject(response.statusText)
                }
            })
            .then(() => {
                console.log('Deleted on server')
            })
            .catch((err) => {
                const eventName = new Date().toDateString() + '_DeleteNote_' + key;
                return eventContext.addEvent({ EventName: eventName, promise: deleteNote(key) }).then(() => {
                    return dataContext.deleteNote(key)
                })
            });
    } else {
        const eventName = new Date().toDateString() + '_DeleteNote_' + key;
        return eventContext.addEvent({ EventName: eventName, promise: deleteNote(key) }).then(() => {
            return dataContext.deleteNote(key)
        })
    }
}

function ResolveGetNote(dataContext: NoteContext, key: string, dataRow: any): Note | PromiseLike<Note> {
    return new Promise<Note>((response) => {
        const promises: any = [];
        promises.push(dataContext.deleteNote(key) as any);
        promises.push(dataContext.addNote(dataRow.id, dataRow));
        return Promise.all(promises).then(() => {
            response(dataRow);
        });
    });
}

function resolveGetNotes(dataContext: NoteContext, result: any): Note[] | PromiseLike<Note[]> {
    return new Promise<Note[]>((response) => {
        const promises = [];
        promises.push((dataContext.cleanAllNote() as any));
        (result as Note[]).forEach(x => {
            promises.push(dataContext.addNote(x.id, x));
        });
        return Promise.all(promises).then(() => {
            response(result);
        });
    });
}
