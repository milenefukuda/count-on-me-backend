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
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

// aqui talvez precise adiconar ao Schema "evento" type: string

export const MessageModel = model("Message", messageSchema);
