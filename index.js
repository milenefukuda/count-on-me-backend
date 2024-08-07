import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config.js";
import { userRouter } from "./routes/user.routes.js";
import cors from "cors";
import { eventRouter } from "./routes/event.routes.js";
import { messageRouter } from "./routes/message.routes.js";
import { uploadImgRouter } from "./routes/uploadImage.routes.js";

// Configura o servidor para acessar as variáveis do arquivo .env
dotenv.config();

// Invoca a função de conexão com o banco de dados
connectToDB();

// Instancia o express
const app = express();

// Aqui configuramos o backend para aceitar requisições do reactApp
app.use(cors());

// Configura o servidor para aceitar JSON
app.use(express.json());

const isVercel = process.env.DEPLOYMENT_ENV === "vercel";

// Aqui estamos dizendo para o app usar a rota "/x" e direcionar o request para o arquivo user.routes.js
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/message", messageRouter);
app.use("/uploadImg", uploadImgRouter);

// Para criar um ID o comando é:
uuidv4();

// Função para fazer o servidor rodar na porta 4000. Essa função tem sempre de estar no fim do arquivo
//app.listen(process.env.PORT, () => {
//  console.log("Server up and running on port 4000");
//});

if (!isVercel) {
  app.listen(3000).on("listening", () => {
    logger.info("server is listening on port http://localhost:3000");
  });
}

export default app;
