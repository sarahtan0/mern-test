import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
    if(req.session.userId){
        //continue to the next handler (getAuthenticatedUser in this case)
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};