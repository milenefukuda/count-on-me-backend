import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    //retira os espaços que sobram no começo e no fim da string
    trim: true,
    minlength: 2,
    maxlenght: 20,
  },
  email: {
    trype: String,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // só vai aceitar as strings contidas no array
    enum: ["user", "admin"],
    default: "user",
  },
  timestamps: true,
});

// timestamps é um objeto de configuração que cria 2 chaves dentro do seu objeto
// .createdAt - chave criada automaticamente quando o objeto for criado
// .updatedAt - chave atualiza automaticamente toda vez que o objeto sofre qualquer alteração

export const UserModel = model("User", userSchema);
