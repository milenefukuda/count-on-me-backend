import { Schema, model } from "mongoose";
const colorRegex = /^#[0-9A-Fa-f]{6}$/;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  date: {
    type: Date,
    //    required: true,
  },
  time: {
    type: String,
    //    required: true,
  },
  local: {
    type: String,
    //    required: true,
  },
  categories: {
    type: String,
    enum: [
      "Habitação",
      "Meio Ambiente",
      "Direitos Humanos",
      "Saúde",
      "Educação",
      "Igualdade de genêro",
      "Igualdade racial",
    ],
    default: "Choose one",
    //   required: true,
  },
  picture: {
    type: String,
    //    required: true,
  },
  description: {
    type: String,
    //    required: true,
  },
  associatedLinks: {
    type: String,
    //    required: true,
  },
  supporters: {
    type: Number,
    default: 0,
  },
  primaryColor: {
    type: String,
    default: "#FFFFFF",
    validate: {
      validator: function (color) {
        return colorRegex.test(color);
      },
      message: "Invalid primary color",
    },
  },
  secondaryColor: {
    type: String,
    default: "#000000",
    validate: {
      validator: function (color) {
        return colorRegex.test(color);
      },
      message: "Invalid secondary color",
    },
  },

  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const EventModel = model("Event", eventSchema);
