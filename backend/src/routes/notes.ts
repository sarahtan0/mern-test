import express from "express";
import * as NotesController from "../controllers/notes";

//handles the different routes that the user can access
const router = express.Router();

//use router to keep the same express call as app.ts
router.get("/", NotesController.getNotes);

//noteId is a variable that will run getNote on the specific id
router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNote);

router.patch("/:noteId", NotesController.updateNote);

router.delete("/:noteId", NotesController.deleteNote);

export default router;