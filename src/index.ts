import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import todoRouter from "./routes/todoRoutes";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import errorHanlder from "./middlewares/errorHanlder";

// Load variables from the .env file into process.env

//Initialising express app
const app = express();

//Builtin middleware to parse the request body
app.use(express.json());

// using cors library to automatically set request headers to avoid cors errors
app.use(cors());

//connect to database
connectDB();

app.use("/todo", todoRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

//global error handling middleware
app.use(errorHanlder);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
