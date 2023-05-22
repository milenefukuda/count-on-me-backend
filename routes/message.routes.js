import express from "express";
import { MessageModel } from "../models/message.model.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../models/user.model.js";

const messageRouter = express.Router();

// Deixar um comentário - user não logado
messageRouter.post("/thankYou", async (req, res) => {
  try {
    const newMessage = await MessageModel.create({ ...req.body });
    return res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Deixar um comentário - user logado
messageRouter.post(
  "/thankYouLogado",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const newUserMessage = await MessageModel.create({
        ...req.body,
        creator: req.currentUser._id,
      });
      await UserModel.findOneAndUpdate(
        { _id: req.currentUser._id },
        { $push: { message: newUserMessage._id } },
        { new: true, runValidators: true }
      );
      return res.status(201).json(newUserMessage);
    } catch (err) {
      console.log(err);
    }
  }
);

// Ver todas as mensagens
messageRouter.get("/thankYouWall", async (req, res) => {
  try {
    const allMessages = await MessageModel.find({});
    return res.status(200).json(allMessages);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { messageRouter };
