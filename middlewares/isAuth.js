import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";

// Verifica o autor da requisição

dotenv.config();

export default expressjwt({
  secret: process.env.TOKEN_SIGN_SECRET,
  algorithms: ["HS256"],
});
