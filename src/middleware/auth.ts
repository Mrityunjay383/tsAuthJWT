import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//Checking if the token is valid or not
export const valToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // looking for token in the header
    let authHeaderVal = req.cookies.token || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).send("token not found");
    }

    const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header

    //verifying token with the secret key
    req.userData = jwt.verify(token, process.env.SECRET_KEY || "");
    next();
  } catch (e) {
    return res.status(401).json({
      msg: "Auth failed not verified user",
      err: e,
    });
  }
};
