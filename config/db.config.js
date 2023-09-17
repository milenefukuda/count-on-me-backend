import mongoose from "mongoose";

// Conecta o banco de dados com o servidor toda vez que ele estiver online

export async function connectToDB() {
  try {
    mongoose.set("strictQuery", false);
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connect to db: ${dbConnect.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}
