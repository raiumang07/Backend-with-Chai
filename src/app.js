import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// middlewares 
app.use(express.json({ limit: "16kb" }))// for json
app.use(express.urlencoded({ extended: true, limit: "16kb" }))// for urls 
app.use(express.static("public"))// for static files "public" folder holding various files like pdf etc.
app.use(cookieParser())// used to perform CRUD operations on browser cookies of user



export { app }