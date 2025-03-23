import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
// used to add endpoints for apis
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!!!!!!!");
});

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(() => {
  //what happens after connection occurs
  console.log("Mongoose connected");
  app.listen(port, () => {
    console.log(`server running on port: ${port}`);
  });
});
