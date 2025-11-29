import mongoose, { Schema, Document } from "mongoose";

// Array de DDDs fornecido na prova
const ddds = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];

const MilitarSchema = new Schema({
    nome: { type: String, required: [true, "Nome é obrigatório"] },
    idade: { type: Number, min: [18, "Idade mínima é 18 anos"] },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v: string) {
                // Regex básico + Validação específica militar
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const dominiosValidos = ["@eb", "@marinha", "@fab"];
                const temSufixo = v.endsWith(".mil.br");
                const temDominio = dominiosValidos.some(d => v.includes(d));
                return regex.test(v) && temSufixo && temDominio;
            },
            message: "Email inválido. Deve ser das forças armadas (.mil.br e conter @eb, @marinha ou @fab)."
        }
    },
    fone: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v: string) {
                const regex = /^[0-9]{10,11}$/;
                const ddd = parseInt(v.substring(0, 2));
                return regex.test(v) && ddds.includes(ddd);
            },
            message: "Telefone inválido ou DDD inexistente."
        }
    }
});

export default mongoose.model("Militar", MilitarSchema);