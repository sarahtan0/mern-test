import { RequestHandler } from "express";
import NoteModel from "../models/note";

//retrieves all notes from mongodb and converts into json
export const getNotes: RequestHandler = async (req, res, next) => {
    try{
        //after the noteModel finds data, it will assign it to notes
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error){
        next(error);
    }
}