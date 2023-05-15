import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import generateToken from "../config/jwt.config.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

// define a quantidade de saltos na criptografia da senha
const saltRounds = 11;

userRouter.get("/welcome", (req, res) => {
  return res.status(200).json("Welcome!!!");
});

// Criar um novo usuário
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
      return res.status(400).json({
        message:
          "Invalid email or password. Check if both match the required format.",
      });
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

// Fazer login
userRouter.post("/login", async (req, res) => {
  try {
    // captura as chaves de email e password enviadas no corpo da requisição
    const { email, password } = req.body;

    // encontra o usuário no banco de dados pelo email
    const user = await UserModel.findOne({ email: email });

    // checa se o usuário existe
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // chama o método .compare() da biblioteca bcrypt para comparar se a password e o passwordHash são compatíveis
    if (await bcrypt.compare(password, user.passwordHash)) {
      // caso positivo, apagar o passwordHash do user para não devolver essa informação
      delete user._doc.passwordHash;

      // gerar token com as informações do usuário
      const token = generateToken(user);

      // retorna um objeto com as informações do user e o token
      return res.status(200).json({
        user: { ...user._doc },
        token: token,
      });
    } else {
      // se a comparação entre password e passwordHash não foram compatíveis
      return res.status(201).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.get("/profile", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await UserModel.findById(loggedInUser._id);
    delete user._doc.passwordHash;
    delete user.doc__v;
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error message" });
  }
});

export default userRouter;
