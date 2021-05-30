import './App.css';
import { NoteContext } from './Data/dbcontexts/Note.contextt';
import { ApplicationContext } from './models/context/ApplicationContexts';
import { NoteList } from './Components/List';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { FormNote } from './Components/NoteForm';
import { ValidateHeartServer } from './Data/apis/heart-check.api';

function App() {
  const [online, setOnline] = useState(false);
  let contexts = {
    noteContext: new NoteContext(),
    online: online
  }
  useEffect(() => {

    const timer = setInterval(() => {
      //console.log('Timer', new Date().toTimeString())
      ValidateHeartServer()
        .then(() => setOnline(true))
        .catch(() => setOnline(false))
    }, 1000)
    return () => clearInterval(timer);
  }, [online])
  return (
    <ApplicationContext.Provider value={contexts}>
      {online ? 'Online' : 'Offline'}
      <FormNote />
      <NoteList />
    </ApplicationContext.Provider>
  );
}

export default App;
