import "dotenv/config";
import express from "express";
import NoteModel from "./models/note";

const app = express();

//add async for code to use await so other code can run while getting data
app.get("/", async (req, res) => {
    //after the noteModel finds data, it will assign it to notes
    const notes = await NoteModel.find().exec();
    //turns notes into a json 
    res.status(200).json(notes);
});

export default app;