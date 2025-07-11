import { Modal, Form, Button } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./forms/TextInputField";

//these are diff functions you can assign when usig in app.tsx
interface AddEditNoteDialogProps {
    //changes values but doesn't return, replace void with actual func in app.tsx
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
    noteToEdit?: Note,
}

const AddEditNoteDialog = ({onDismiss, onNoteSaved, noteToEdit} : AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) {
        try{
            let noteResponse: Note;
            if(noteToEdit){
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit note" : "Add note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label="Text"
                        type="text"
                        as="textarea"
                        rows={5}
                        placeholder="Enter text"
                        register={register}
                        error={errors.text}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;