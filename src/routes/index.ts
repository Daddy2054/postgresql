import express, { NextFunction, Request, Response } from "express";
import { Article } from "../models/article";
const routes = express.Router();

routes.get("/", (req: Request, res: Response): void => {
  try {
    res.send('this is the "index" route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.get("/:id", (req: Request, res: Response): void => {
  try {
    res.send('this is the "show" route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.post("/", (req: Request, res: Response): void => {
  const article: Article = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  };
  try {
    res.send('this is the "create" route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.put("/:id", (req: Request, res: Response): void => {
  const article: Article = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  };
  try {
    res.send('this is the "edit" route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.delete("/:id", (req: Request, res: Response): void => {
  try {
    res.send('this is the "delete" route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default routes;
