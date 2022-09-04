import express, { Request, Response } from "express";
import { Article, ArticleStore } from "../models/article";

const routes = express.Router();
const store = new ArticleStore();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.get("/:id", async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.post("/", async (req: Request, res: Response) => {
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

routes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const del = await store.delete(req.params["id"]);
    res.json(del);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default routes;
