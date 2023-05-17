import express from "express";
import { EventModel } from "../models/event.model.js";
import { UserModel } from "../models/user.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const eventRouter = express.Router();

eventRouter.get("/all-events", async (req, res) => {
  try {
    const events = await EventModel.find();
    return res.status(200).json(events);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

eventRouter.get("/event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneEvent = await EventModel.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Criar novo evento
eventRouter.post("/create", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const newEvent = await EventModel.create({
        ...req.body,
        creator: req.currentUser._id,
      }),
      updatedUser = await UserModel.findByIdAndUpdate(req.currentUser._id, {
        $push: { events: newEvent._doc._id },
      });
    return res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Apagar um evento
eventRouter.delete(
  "/delete/:eventId",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { eventId } = req.params,
        selEvent = await EventModel.findById(eventId);
      if (
        JSON.stringify(selEvent._doc.creator) !=
        JSON.stringify(req.currentUser._id)
      ) {
        return res.status(401).json("Not authorized");
      }
      const deletedEvent = await EventModel.findByIdAndDelete(eventId);
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.currentUser._id,
        {
          $pull: { events: deletedEvent._doc._id },
        }
      );
      return res.status(200).json(deletedEvent);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

export default eventRouter;
