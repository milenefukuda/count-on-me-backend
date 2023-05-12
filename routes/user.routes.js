import express from "express";

const userRouter = express.Router();

userRouter.get("/welcome", (req, res) => {
  return res.status(200).json("Welcome!!!");
});

export default userRouter;
