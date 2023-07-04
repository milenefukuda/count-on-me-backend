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
    set: function (dateTime) {
      if (dateTime instanceof Date) {
        const eventTime = this.get("time");
        const timeParts = eventTime.split(":");
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        dateTime.setUTCHours(hours);
        dateTime.setUTCMinutes(minutes);
      }
      return dateTime;
    },
  },
  time: {
    type: String,
  },
  local: {
    type: String,
  },
  categories: {
    type: String,
    enum: [
      "Habitação",
      "Meio Ambiente",
      "Direitos Humanos",
      "Saúde",
      "Educação",
      "Igualdade de gênero",
      "Igualdade racial",
    ],
    default: "Choose one",
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
  },
  associatedLinks: {
    type: String,
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

eventSchema.pre("save", function (next) {
  const eventDate = this.get("date");
  const eventTime = this.get("time");
  if (eventDate && eventTime) {
    const dateTime = new Date(eventDate);
    const timeParts = eventTime.split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    dateTime.setUTCHours(hours);
    dateTime.setUTCMinutes(minutes);
    this.set("date", dateTime);
  }
  next();
});

export const EventModel = model("Event", eventSchema);
