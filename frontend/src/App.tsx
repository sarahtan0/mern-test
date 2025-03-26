import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Note } from './models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    //make it its own func to make it async
    async function loadNotes(){
      try{
        //configures a get request from db
        const response = await fetch("/api/notes", {method: "GET"});
        //turns response into json, this is asynch
        const notes = await response.json();
        setNotes(notes);

      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);
  //empty array only executes func when page loads - if you put any vars it updates when the var updates

  return (
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
