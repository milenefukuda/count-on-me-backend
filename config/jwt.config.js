import jwt from "jsonwebtoken";

// Aqui criamos o token para autenticação do usuário logado. Essa função será chamada no momento do login do usuário

export default function generateToken(user) {
  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "24h";
  return jwt.sign({ _id, email, role }, signature, {
    expiresIn: expiration,
  });
}
