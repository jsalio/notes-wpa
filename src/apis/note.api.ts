import { Note } from "../models/Db/note"

const apiPath = 'http://localhost:3009/api/notes/'

export const getAllNote = (): Promise<Response> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return (fetch(`${apiPath}get-all`, requestOptions))
}

export const geNoteByKey = (key: string): Promise<Response> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return (fetch(`${apiPath}get-by-id/${key}`, requestOptions))
}

export const addNote = (note: Note): Promise<Response> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };
    return (fetch(`${apiPath}add`, requestOptions)).then(response => response.json())
}

export const updateNote = (key: string, note: Note): Promise<Response> => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };
    return (fetch(`${apiPath}/${key}/update`, requestOptions)).then(response => response.json())
}

export const deleteNote = (key: string): Promise<Response> => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    return (fetch(`${apiPath}remove-by-id/${key}`, requestOptions))
}