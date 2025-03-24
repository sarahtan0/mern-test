import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from "./models/note";

const app = express();

//add async for code to use await so other code can run while getting data
app.get("/", async (req, res, next) => {
    try{
        //after the noteModel finds data, it will assign it to notes
        const notes = await NoteModel.find().exec();
        //turns notes into a json 
        res.status(200).json(notes);
    } catch (error){
        next(error);
    }
});

//runs if user is at unknown route
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

//type has to be defined here because this input can be anything
//keep next without using so express knows it's for error handling

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
        let errorMessage = "An unknown error occurred";
        //change message if there is a message in the error
        if (error instanceof Error) errorMessage = error.message;
        res.status(500).json({error: errorMessage});
});

export default app;