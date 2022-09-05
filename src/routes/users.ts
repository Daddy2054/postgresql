import express, { NextFunction, Request, Response } from "express";
import verifyAuthToken from '../middleware/verify_token'
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { token_secret } from "../database";

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
  //  console.log(user.username,user.password)
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ newUser }, token_secret as string);
    res.json(token);
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
    const authUser = await store.authenticate(user.username, user.password);
    const token = jwt.sign({ authUser }, token_secret as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default usersRoutes;
