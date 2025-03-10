import express from "express";
import {config} from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {dbConnection} from "./database/dbConnection.js";
import userRouter from "./router/userRouter.js";
import {errorMiddleware} from "./middlewares/error.js";

const app = express();
config({path: "./config/config.env"});

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE", "FETCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use("/api/v1/user", userRouter);


dbConnection();

app.use(errorMiddleware);
export default app;