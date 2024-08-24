// require("dotenv").config({ path: "./env" });  -- better way below
import dotenv from "dotenv"


// import mongoose from "mongoose"
// import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";


dotenv.config({
    path: "./env"
});

// APPROACH 2 Professional Approach -- import from the db file index.js
connectDB();

/*   APPROACH 1:
import express from "express";
const app = express();

// function connectDB() {};
// connectDB();
// ---> better approach use ifies

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("errror", (error) => {
            console.log("ERRR: ", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})

*/