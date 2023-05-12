import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import connectToDB from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

// instancia o express
const app = express();

// configura o servidor para aceitar JSON
app.use(express.json());

// aqui estamos dizendo para o app usar a rota /user e direcionar o request para o arquivo user.routes.js
app.use("/user", userRouter);

// aqui configuramos o backend para aceitar requisições do reactApp
app.use(cors());

// para criar um ID o comando é:
uuidv4();

// configura o servidor para acessar as variáveis do arquivo .env
dotenv.config();

// invoca a função de conexão com o banco de dados
connectToDB();

// array para guardar as informações desejadas
let data = [];

// primeira rota
app.get("/home", (req, res) => {
  return res.status(200).json("Home!");
});

// função para fazer o servidor rodar na porta 4000. Essa função tem sempre de estar no fim do arquivo
app.listen(process.env.PORT, () => {
  console.log("Server up and running on port 4000");
});
