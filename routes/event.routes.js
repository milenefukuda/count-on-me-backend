import express from "express";
import { EventModel } from "../models/event.model.js";

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
