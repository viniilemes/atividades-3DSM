import mongoose, { Schema } from "mongoose";

const SoldadoSchema = new Schema({
    cim: { type: Number, required: true, unique: true },
    altura: { type: Number, min: [1.62, "Altura mínima é 1.62m"] },
    militar: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Militar', // Referência ao Model Militar
        required: true,
        validate: {
            validator: async function(v: string) {
                const militar = await mongoose.model('Militar').findById(v);
                return !!militar; // Retorna true se achar o militar
            },
            message: "ID do Militar não encontrado no banco."
        }
    }
});

export default mongoose.model("Soldado", SoldadoSchema);