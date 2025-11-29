import mongoose, { Schema } from "mongoose";

const PatenteSchema = new Schema({
    codigo: { 
        type: Number, 
        validate: {
            validator: (v: number) => v > 0 && v <= 20,
            message: "Código deve ser maior que 0 e menor ou igual a 20"
        }
    },
    descricao: { type: String, required: true }
});

export default mongoose.model("Patente", PatenteSchema);