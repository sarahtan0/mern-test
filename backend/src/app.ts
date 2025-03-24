import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";

const app = express();

app.use("/api/notes", notesRoutes);

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