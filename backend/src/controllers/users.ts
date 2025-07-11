import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await userModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown,unknown,SignUpBody,unknown> = 
    async(req: Request<unknown,unknown,SignUpBody,unknown>, res: Response, next: NextFunction) => {
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

        req.session.userId = newUser._id;

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
};

interface loginBody{
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, loginBody, unknown> = async(req: Request<unknown, unknown, loginBody, unknown>, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) throw createHttpError (400, "Parameters missing");
        
        //check if user exists
        const user = await userModel.findOne({username: username}).select("+password +email").exec();
        if(!user) throw createHttpError(401, "Invalid credentials");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) throw createHttpError(401, "Invalid credentials");

        //used to remember user
        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req: Request, res: Response, next: NextFunction) =>  {
    req.session.destroy(error => {
        if(error){
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
}