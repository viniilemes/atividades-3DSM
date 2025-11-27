import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bdaula";

export default function connect() {
    mongoose.connection.on("connected", () => console.log("mongoose: connected"));
    mongoose.connection.on("open", () => console.log("mongoose: open"));
    mongoose.connection.on("disconnected", () => console.log("mongoose: disconnected"));
    mongoose.connection.on("reconnected", () => console.log("mongoose: reconnected"));
    mongoose.connection.on("disconnecting", () => console.log("mongoose: disconnecting"));
    mongoose.connection.on("close", () => console.log("mongoose: close"));

    mongoose
        .connect(uri, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        } as any)
        .then(() => console.log("Conectado ao MongoDB"))
        .catch((e: any) => {
            console.error("Erro ao conectar ao MongoDB:", e.message || e);
        });

    process.on("SIGINT", async () => {
        try {
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        } catch (error) {
            console.error("Erro ao fechar a conexão com o MongoDB:", error);
            process.exit(1);
        }
    });
}
