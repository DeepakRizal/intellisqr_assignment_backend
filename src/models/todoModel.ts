import mongoose, { model, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: [true, "Title is required!"] },
  completed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.models.Todo || model<ITodo>("Todo", TodoSchema);

export default Todo;
