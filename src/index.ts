import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import todoRouter from "./routes/todoRoutes";
import userRouter from "./routes/userRoutes";

// Load variables from the .env file into process.env
dotenv.config();

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

//global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error: ", err);

  const status = err.status || 500;
  const message = err.message || "something went wrong";

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
