import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//retrieves all notes from mongodb and converts into json
export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try{
        //after the noteModel finds data, it will assign it to notes
        const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(notes);
    } catch (error){
        next(error);
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    
    try{
        if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id");

        const note = await NoteModel.findById(noteId).exec();

        if(!note) throw createHttpError(404, "Note not found");
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try{
        if(!title){
            throw createHttpError(400, "Note must have a title")
        }
        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text
        });

        res.status(201).json(newNote);
    } catch (error){
        next(error);
    }
};

interface UpdateNoteParams {
    noteId: string,
}

//defines object UpdateNoteBody
interface UpdateNoteBody {
    title?: string,
    text?: string,
}

//updatenoteparams = request parameter type
//unknown = res body (unknown bc we don't care)
//updateNoteBody = request body type
//unknown = query (we also don't care)
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id");
        
        if(!newTitle) throw createHttpError(400, "Note must have a title");

        const note = await NoteModel.findById(noteId).exec();

        if(!note) throw createHttpError(404, "Note not found");

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error){
        next(error);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    try{
        if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id");

        const note = await NoteModel.findById(noteId).exec();

        if(!note) throw createHttpError(404, "Note not found");

        await note.deleteOne();

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};