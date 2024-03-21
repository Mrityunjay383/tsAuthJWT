import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/user";

export const register = async (req: Request, res: Response) => {
  try {
    type RequestBody = {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    const { firstName, lastName, email, password }: RequestBody = req.body;

    if (!(firstName && lastName && email && password)) {
      res.status(404).send("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already exist");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encPassword,
    });

    //token
    const token = jwt.sign({ user_id: user._id, email }, "Mrityunjay", {
      expiresIn: "2h",
    });

    res.status(201).json({ success: true, user, token });
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    type RequestBody = {
      email: string;
      password: string;
    };

    const { email, password }: RequestBody = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //token
      const token = jwt.sign({ user_id: user._id, email }, "Mrityunjay", {
        expiresIn: "2h",
      });

      // Setting Up cookies
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }

    res.status(400).send("Email or password incorrect");
  } catch (e) {
    console.log(e);
  }
};
