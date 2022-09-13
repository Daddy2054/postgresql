import jwt from "jsonwebtoken";
import { token_secret } from "../database";
import { User } from "../models/user";
import express, { NextFunction, Request, Response } from "express";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, token_secret as string);
    //req.body.id = decoded.id
    //  const {authUser}=decoded
    //console.log(decoded(authUser.username));
    const test1 = JSON.stringify(decoded);
    const test2 = JSON.parse(test1);
console.log(decoded);
    console.log(test2.authUser.username);
    //    console.log(jwt.verify(token, token_secret as string).[0])
    //return test2.authUser.username;
    next();
  } catch (error) {
    res.status(401);
  }
};
export default verifyAuthToken;
