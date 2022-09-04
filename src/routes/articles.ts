import express, { Request, Response } from "express";
import { Article, ArticleStore } from "../models/article";

const articlesRoutes = express.Router();
const store = new ArticleStore();

articlesRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

articlesRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

articlesRoutes.post("/", async (req: Request, res: Response) => {
  const article: Article = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  };
  try {
    const create = await store.create(article);
    res.json(create);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

articlesRoutes.put("/:id", (req: Request, res: Response): void => {
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

articlesRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const del = await store.delete(req.params["id"]);
    res.json(del);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default articlesRoutes;
