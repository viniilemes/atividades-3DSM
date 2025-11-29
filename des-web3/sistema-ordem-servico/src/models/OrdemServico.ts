import mongoose, { Schema, Document } from 'mongoose';

export type Status = 'aberta' | 'em andamento' | 'concluída';
export type Prioridade = 'baixa' | 'média' | 'alta';

export interface IOrdemServico extends Document {
  titulo: string;
  descricao: string;
  dataAbertura: Date;
  status: Status;
  prioridade: Prioridade;
  responsavel?: string;
  setorSolicitante: string;
  prazoEstimado?: Date;
  valorServico: number;
}

const OrdemServicoSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  dataAbertura: { type: Date, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ['aberta', 'em andamento', 'concluída'],
    default: 'aberta',
  },
  prioridade: {
    type: String,
    required: true,
    enum: ['baixa', 'média', 'alta'],
  },
  responsavel: { type: String },
  setorSolicitante: { type: String, required: true },
  prazoEstimado: { type: Date },
  valorServico: { type: Number, required: true },
});

export default mongoose.model<IOrdemServico>('OrdemServico', OrdemServicoSchema);
