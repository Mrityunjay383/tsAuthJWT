import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { valToken } from "../middleware/auth";

router.get("/", valToken, (req: Request, res: Response) => {
  res.status(200).json({user: req.userData });
});

export default router;
