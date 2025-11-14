import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoContoller";
import { protect } from "../middlewares/auth";

const router = express.Router();

//route to create todo
router.post("/", protect, createTodo);
//route to get all the todos
router.get("/", protect, getAllTodos);

//route to update a todo
router.patch("/:id", protect, updateTodo);

//route to delete a todo
router.delete("/:id", protect, deleteTodo);

export default router;
