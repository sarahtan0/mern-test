import express from "express";
// used to add endpoints for apis
const app = express();
const port = 8000;
//use 8000 if 5000 is full

app.get("/", (req, res) => {
    res.send("hello world!!!!!!!")
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});