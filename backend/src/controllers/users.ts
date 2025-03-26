import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from "bcrypt";

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown,unknown,SignUpBody,unknown> = async(req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters missing");
        }

        //check if users or emails are already in the db
        const existingUsername = await userModel.findOne({username: username}).exec();

        if (existingUsername){
            throw createHttpError(409, "Username already taken");
        }

        const existingEmail = await userModel.findOne({email: email}).exec();

        if (existingEmail) {
            throw createHttpError(409, "This email is already in use, please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        })

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
};