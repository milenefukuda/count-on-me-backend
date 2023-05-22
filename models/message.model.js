import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userMessage: {
    trype: String,
    required: true,
  },
  picture: {
    type: String,
  },
  countMeIn: {
    type: Boolean,
  },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

// aqui talvez precise adiconar ao Schema "evento" type: string
