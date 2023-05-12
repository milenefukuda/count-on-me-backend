// Verifica o autor da requisição

const { expressjwt } = require("express-jwt");

export default expressjwt({
  secret: process.env.TOKEN_SIGN_SECRET,
  algorithms: ["HS256"],
});
