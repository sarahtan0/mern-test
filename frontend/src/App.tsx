import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Note as NoteModel} from './models/note';
import Note from './components/Note';
import { Col, Container, Row, Button } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note} className={styles.note}/>
          </Col>
        ))}
      </Row>
      {showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={() => {}}
        />
      }
    </Container>
  );
}

export default App;
