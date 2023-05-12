import { UserModel } from "../models/user.model.js";

async function attachCurrentUser(req, res) {
  try {
    // pegar as infos disponibilizadas no middleware isAuth
    const loggedInUser = req.auth;
    // achar o usuário pelo _id do loggedInUser
    const user = await UserModel.findOne(
      { _id: loggedInUser._id },
      // não adicionar o campo da senha hasheada
      { passwordHash: 0 }
    );

    // checa se o usuário foi encontrado
    if (!user) {
      return res.status(400).json({ message: "This user does not exist." });
    }

    // cria o campo currentUser e o adiciona no banco de dados
    req.currentUser = user;

    // função que faz seguir para o próximo passo da requisição
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export default attachCurrentUser;
