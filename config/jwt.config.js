import jwt from "jsonwebtoken";

// Aqui criamos o token para autenticação do usuário logado
// Essa função será chamada no momento do login do usuário

// quando essa função for executada, ela receberá como parâmetro o user que vier do banco de dados
const generateToken = (user) => {
  // seleciona os campos que serão encriptados no token
  const { _id, name, email, role } = user;
  // a signature é a chave secreta que vai decodificar o token
  const signature = process.env.TOKEN_SIGN_SECRET;
  // determina o tempo de validade do token
  const expiration = "24h";
  // a função retorna a função sign da biblioteca jwt e recebe 3 parâmetros
  // 1- um objeto com todas as infos que queremos guardar no token
  // 2- a signature com a chave secreta do token
  // 3- um objeto de configuração para expiração do token
  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
};

export default generateToken;
