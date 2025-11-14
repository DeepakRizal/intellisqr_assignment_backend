import { NextFunction, Request, Response } from "express";
import Todo from "../models/todoModel";
import { AuthRequest } from "../middlewares/auth";

// create todo handler
export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTodo = await Todo.create({ ...req.body, userId: req.user._id });

    return res.status(201).json({
      success: true,
      todo: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

// Handler to get all the todos
export const getAllTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user);
    const allTodos = await Todo.find({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      todos: allTodos,
    });
  } catch (error) {
    next(error);
  }
};

//Handler to update a todo
export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body);
    if (!updateTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not updated something went wrong!",
      });
    }
    return res.status(200).json({
      success: true,
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// handler to delete  a todo
export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    console.log(deletedTodo);

    // 3. If no document deleted
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(204).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
