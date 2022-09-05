import jwt from "jsonwebtoken";
import { token_secret } from "../database";
import express, { NextFunction, Request, Response } from "express";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, token_secret as string);

    next();
  } catch (error) {
    res.status(401);
  }
};
export default verifyAuthToken;
