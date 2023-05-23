import mongoose from "mongoose";

export async function connectToDB() {
  try {
    mongoose.set("strictQuery", false);
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connect to db: ${dbConnect.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}

// esse arquivo contém a função responsável por conectar o banco de dados com o servidor toda vez que ele estiver online
