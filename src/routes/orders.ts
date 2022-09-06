import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyAuthToken from "../middleware/verify_token";

const OrdersRoutes = express.Router();
const store = new OrderStore();

OrdersRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

OrdersRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

OrdersRoutes.post(
  "/",
  // verifyAuthToken,
  async (req: Request, res: Response) => {
    const order: Order = {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
    };
    try {
      const create = await store.create(order);
      res.json(create);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);


OrdersRoutes.put(
  "/:id",
  verifyAuthToken,
  (req: Request, res: Response): void => {
    const Order: Order = {
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
  }
);

OrdersRoutes.delete(
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

export default OrdersRoutes;
