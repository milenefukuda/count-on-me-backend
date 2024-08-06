import cloudinary from "cloudinary";
import multer from "multer";
import * as dotenv from "dotenv";

// Faz a conexão com o banco de imagens

dotenv.config();

const cloudinaryInst = cloudinary.v2;

cloudinaryInst.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImg = multer();

export { uploadImg };
