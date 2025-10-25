import { Schema, model, Document } from 'mongoose';

// Interface para tipagem do TypeScript
export interface IDisco extends Document {
  titulo: string;
  artista: string;
  ano: number;
  genero: string;
  formato: 'Vinil' | 'CD';
  preco: number;
}

// Schema do Mongoose (validação do MongoDB)
// (Campos: título, artista, ano, gênero, formato e preço)
const DiscoSchema = new Schema<IDisco>({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true },
  formato: { type: String, enum: ['Vinil', 'CD'], required: true },
  preco: { type: Number, required: true },
}, {
  timestamps: true // Adiciona createdAt e updatedAt
});

export default model<IDisco>('Disco', DiscoSchema);