import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import express from "express";
// used to add endpoints for apis
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!!!!!!!");
});

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!).
    then(() => {
        //what happens after connection occurs
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log(`server running on port: ${port}`);
        });
    })
    .catch(console.error);
