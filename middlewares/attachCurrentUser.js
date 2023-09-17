import { UserModel } from "../models/user.model.js";

export default async function attachCurrentUser(req, res, next) {
  try {
    // Pega as infos disponibilizadas no middleware isAuth
    const loggedInUser = req.auth;
    // Encontra o usuário pelo _id do loggedInUser
    const user = await UserModel.findOne(
      { _id: loggedInUser._id },
      // Não adiciona o campo da senha hasheada
      { passwordHash: 0 }
    );

    // Checa se o usuário foi encontrado
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Cria o campo currentUser e o adiciona no banco de dados
    req.currentUser = user;

    // Faz seguir para o próximo passo da requisição
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
