import React from 'react';
import { NoteContext } from '../../Data/dbcontexts/Note.contextt';

let dbContext: NoteContext = new NoteContext();

const initialContext = {
    noteContext: dbContext,
    online: true
}

export const ApplicationContext = React.createContext(initialContext)