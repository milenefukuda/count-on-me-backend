import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  countOnMe: {
    type: Boolean,
  },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
});

export const MessageModel = model("Message", messageSchema);
