import mongoose from "mongoose";

// Conecta o banco de dados com o servidor toda vez que ele estiver online

export async function connectToDB() {
  try {
    mongoose.set("strictQuery", false);
    //    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    const dbConnect = await mongoose.connect(
      "mongodb+srv://count-on-me-admin:dIW3wFW3vRXIZtEB@count-on-me.uq26q3y.mongodb.net/?retryWrites=true&w=majority&appName=count-on-me"
    );
    console.log(`Connect to db: ${dbConnect.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}
