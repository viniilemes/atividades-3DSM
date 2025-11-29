import type { Request, Response } from 'express';
import OrdemServico from '../models/OrdemServico.js';

export class OrdemServicoController {
  // Criar
  async create(req: Request, res: Response) {
    try {
      const ordem = await OrdemServico.create(req.body);
      return res.status(201).json(ordem);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar ordem de serviço', details: (error as Error).message });
    }
  }

  // Ler (Listagem e Filtros)
  async getAll(req: Request, res: Response) {
    try {
      const { status, prioridade, setor } = req.query;
      const filter: any = {};

      if (status) filter.status = status;
      if (prioridade) filter.prioridade = prioridade;
      if (setor) filter.setorSolicitante = new RegExp(String(setor), 'i');

      const ordens = await OrdemServico.find(filter).sort({ dataAbertura: -1 });
      return res.json(ordens);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ordens', details: (error as Error).message });
    }
  }

  // Atualizar
  async update(req: Request, res: Response) {
    try {
      const ordem = await OrdemServico.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada' });
      return res.json(ordem);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar ordem', details: (error as Error).message });
    }
  }

  // Excluir
  async delete(req: Request, res: Response) {
    try {
      const ordem = await OrdemServico.findByIdAndDelete(req.params.id);
      if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir ordem', details: (error as Error).message });
    }
  }
}

export default OrdemServicoController;
