import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

const userRouter = express.Router();

const saltRounds = 10;

userRouter.get("/welcome", (req, res) => {
  return res.status(200).json("Welcome!!!");
});

userRouter.post("/sign-up", async (req, res) => {
  try {
    const { password } = req.body;
    if (
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ) {
      return res
        .status(400)
        .json({ message: "Senha não tem os requisitos necessários" });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassowrd = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassowrd,
    });
    delete user._doc.passwordHash;
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default userRouter;
