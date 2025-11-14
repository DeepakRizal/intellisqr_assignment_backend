import { NextFunction, Request, Response } from "express";
import { logErrorToDb } from "../utils/logError";

async function errorHanlder(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error: ", err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  const errPayload = {
    message: message,
    stack: err.stack,
    name: err.name,
    status,
    path: req.originalUrl,
    method: req.method,
    userId: (req as any).user?._id || null,
    body: req.body,
    query: req.query,
    headers: {
      "user-agent": req.headers["user-agent"],
    },
  };

  await logErrorToDb(errPayload);

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

export default errorHanlder;
