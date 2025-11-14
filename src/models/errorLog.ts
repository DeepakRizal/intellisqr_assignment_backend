import { Schema, model, models, Document } from "mongoose";

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  name?: string;
  status?: number;
  path?: string;
  method?: string;
  userId?: string;
  body?: any;
  query?: any;
  headers?: any;
  createdAt: Date;
}

const errorLogSchema = new Schema({
  message: { type: String, required: true },
  stack: String,
  name: String,
  status: Number,
  path: String,
  method: String,
  userId: String,
  body: Schema.Types.Mixed,
  query: Schema.Types.Mixed,
  headers: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

const ErrorLog =
  models.ErrorLog || model<IErrorLog>("ErrorLog", errorLogSchema);

export default ErrorLog;
