import mongoose from "mongoose";

//adds specific type to this library
declare module "express-session" {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}