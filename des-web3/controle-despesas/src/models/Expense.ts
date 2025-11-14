import { Schema, model, Document } from 'mongoose';

// Interface para o documento
export interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
}

// Schema do Mongoose
const ExpenseSchema = new Schema<IExpense>({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // Valor padrão para data atual 
  }
});

// Exporta o modelo
export default model<IExpense>('Expense', ExpenseSchema);