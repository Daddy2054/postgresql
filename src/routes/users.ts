import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const usersRoutes = express.Router();
const store = new UserStore();


usersRoutes.post("/create", async (req: Request, res: Response) => {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const create = await store.create(user);
      res.json(create);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  });

  usersRoutes.post("/authenticate", async (req: Request, res: Response) => {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const auth = await store.authenticate(user.username,user.password );
      res.json(auth);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  });
  
  export default usersRoutes;