import express from "express";
import { MessageModel } from "../models/message.model.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../models/user.model.js";
import isAuth from "../middlewares/isAuth.js";

const messageRouter = express.Router();

// Ver todas as mensagens do evento
messageRouter.get("/thankYouWall/:id", async (req, res) => {
  try {
    //este é o id do evento
    const id = req.params.id;
    console.log(id);

    const eventMessages = await MessageModel.find({ eventId: id }); // find sempre precisa do obj
    console.log(eventMessages);
    return res.status(200).json(eventMessages);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Deixar um comentário - user não logado
messageRouter.post("/thankYou/:id", async (req, res) => {
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

export { messageRouter };
