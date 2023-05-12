import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlenght: 20,
  },
  email: {
    trype: String,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  timestamps: true,
});

export const UserModel = model("User", userSchema);
