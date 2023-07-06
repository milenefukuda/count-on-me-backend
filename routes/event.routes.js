import express from "express";
import { EventModel } from "../models/event.model.js";
import { UserModel } from "../models/user.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const eventRouter = express.Router();

// Ver todos os eventos
eventRouter.get("/all-events", async (req, res) => {
  try {
    const events = await EventModel.find();
    return res.status(200).json(events);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Ver os eventos por Id
eventRouter.get("/view/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneEvent = await EventModel.findById(id);
    return res.status(200).json(oneEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Ver todos os eventos criado por userLogado
eventRouter.get(
  "/my-events/:eventId",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const userId = req.currentUser.id;
      const events = await EventModel.find({ creator: userId });
      return res.status(200).json(events);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Criar novo evento
eventRouter.post("/create", isAuth, attachCurrentUser, async (req, res) => {
  try {
    console.log(req);
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

// Apoiar um evento
eventRouter.post("/support/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.supporters++;
    await event.save();
    return res.status(200).json(event);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Editar um evento
eventRouter.put(
  "/edit/:eventId",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { eventId } = req.params;
      const selEvent = await EventModel.findById(eventId);
      if (
        JSON.stringify(req.currentUser._id) !=
        JSON.stringify(selEvent._doc.creator)
      ) {
        return res.status(401).json("Unauthorized");
      }
      const updatedEvent = await EventModel.findByIdAndUpdate(
        eventId,
        { ...req.body },
        { runValidators: true, new: true }
      );
      return res.status(200).json(updatedEvent);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

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

export { eventRouter };
