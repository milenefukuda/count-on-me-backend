import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    match: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
  },
  repeatPassword: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  message: { type: Schema.Types.ObjectId, ref: "Message" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

// timestamps é um objeto de configuração que cria 2 chaves dentro do seu objeto
// .createdAt - chave criada automaticamente quando o objeto for criado
// .updatedAt - chave atualiza automaticamente toda vez que o objeto sofre qualquer alteração

export const UserModel = model("User", userSchema);
