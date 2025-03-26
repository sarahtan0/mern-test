import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Note as NoteModel} from './models/note';
import Note from './components/Note';
import { Col, Container, Row, Button } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from './components/AddEditNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(() => {
    //make it its own func to make it async
    async function loadNotes(){
      try{
        //configures a get request from db and turns into json file
        const notes = await NotesApi.fetchNotes()
        setNotes(notes);

      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);
  //empty array only executes func when page loads - if you put any vars it updates when the var updates

  async function deleteNote(note: NoteModel){
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`mb-4 mt-4 ${styleUtils.blockCenter}`}>
        + Add new note
      </Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id}>
            <Note 
              onNoteClicked={(note) => setNoteToEdit(note)}
              note={note} 
              className={styles.note} 
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog &&
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            //makes new array with same notes + new ones
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);

          }}
        />
      }
      {noteToEdit &&
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNoteToEdit(null);
            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
          }}
        />
      }
    </Container>
  );
}

export default App;
