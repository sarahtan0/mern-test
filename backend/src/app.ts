import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import env from './util/validateEnv';
import MongoStore from "connect-mongo";

const app = express();

//prints log of all endpoints accessed
app.use(morgan("dev"));

//sets up express to accept json calls
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //1 hr in ms
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}));

//good to use a different path for future dev if there are other endpoints
app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);

//runs if user is at unknown route
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

//type has to be defined here because this input can be anything
//keep next without using so express knows it's for error handling

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
        let errorMessage = "An unknown error occurred";
        let statusCode = 500;
        if(isHttpError(error)) {
            statusCode = error.status;
            errorMessage = error.message;
        }
        res.status(statusCode).json({error: errorMessage});
});

export default app;