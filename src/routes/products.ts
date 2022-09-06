import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import verifyAuthToken from "../middleware/verify_token";

const ProductsRoutes = express.Router();
const store = new ProductStore();

ProductsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

ProductsRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

ProductsRoutes.post(
  "/",
  //verifyAuthToken,
  async (req: Request, res: Response) => {
    const product: Product = {
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
    };
    try {
      const create = await store.create(product);
      res.json(create);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

ProductsRoutes.put(
  "/:id",
  verifyAuthToken,
  (req: Request, res: Response): void => {
    const Product: Product = {
      id: req.params.id,
      title: req.body.title,
      price: req.body.price,
    };
    try {
      res.send('this is the "edit" route');
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

ProductsRoutes.delete(
  "/:id",
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const del = await store.delete(req.params["id"]);
      res.json(del);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export default ProductsRoutes;
