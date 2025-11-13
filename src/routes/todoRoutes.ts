import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoContoller";

const router = express.Router();

//route to create todo
router.post("/", createTodo);
//route to get all the todos
router.get("/", getAllTodos);

//route to update a todo
router.patch("/:id", updateTodo);

//route to delete a todo
router.delete("/:id", deleteTodo);

export default router;
