import express from "express";
import * as NotesController from "../controllers/notes";

//handles the different routes that the user can access
const router = express.Router();

//use router to keep the same express call as app.ts
router.get("/", NotesController.getNotes);

export default router;