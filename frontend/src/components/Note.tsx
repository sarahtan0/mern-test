import { Button, Card } from "react-bootstrap";
import { Note as NoteModel} from "../models/note";
import styles from '../styles/Note.module.css';
import { formatDate } from "../utils/formatDate";
import styleUtils from "../styles/utils.module.css";

interface NoteProps {
    note: NoteModel,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string,
}

const Note = ({ note, className, onDeleteNoteClicked } : NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className = {`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <Button className="ms-auto " variant="outline-danger" size="sm" 
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}>
                        X
                    </Button>
                </Card.Title>
                <Card.Text className = {styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    );
};

export default Note;