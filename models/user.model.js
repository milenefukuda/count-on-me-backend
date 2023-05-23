import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 20,
  },
  email: {
    trype: String,
  },
  repeatPassword: {
    type: String,
    required: true,
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
