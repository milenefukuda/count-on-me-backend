import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 20,
  },
  email: {
    trype: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // enum só vai aceitar as strings contidas no array
    enum: ["user", "admin"],
    default: "user",
  },
});

// timestamps é um objeto de configuração que cria 2 chaves dentro do seu objeto
// .createdAt - chave criada automaticamente quando o objeto for criado
// .updatedAt - chave atualiza automaticamente toda vez que o objeto sofre qualquer alteração

export const UserModel = model("User", userSchema);
