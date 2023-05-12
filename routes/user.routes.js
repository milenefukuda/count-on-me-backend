import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

const userRouter = express.Router();

// define a quantidade de saltos na criptografia da senha
const saltRounds = 11;

userRouter.get("/welcome", (req, res) => {
  return res.status(200).json("Welcome!!!");
});

// rota para criar um novo usuário
userRouter.post("/sign-up", async (req, res) => {
  try {
    // captura o password no corpo da requisição
    const { password } = req.body;
    if (
      // checa se existe o campo no req.body e checa o pré requisito da senha
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ) {
      return res
        .status(400)
        .json({ message: "Senha não tem os requisitos necessários" });
    }

    // gera o saltos na quantidade previamente definida
    const salt = await bcrypt.genSalt(saltRounds);

    // chama a função hash da biblioteca e passa a senha com o salto criado
    const hashedPassowrd = await bcrypt.hash(password, salt);

    // cria a entrada do user no banco de dados e adiciona a senha hasheada
    const user = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassowrd,
    });

    // deleta o campo da senha antes de devolver a response ao usuer

    delete user._doc.passwordHash;
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default userRouter;
