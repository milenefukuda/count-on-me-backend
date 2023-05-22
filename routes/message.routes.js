import express from "express";
import { MessageModel } from "../models/message.model.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../models/user.model.js";

const messageRouter = express.Router();

// Rota de comentário
messageRouter.post("/thankYou", async (req, res) => {
  try {
    const newMessage = await MessageModel.create({ ...req.body });
    return res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Rota de comentário para usar logado
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
