import { Request, Response } from 'express';
import Patente from '../models/Patente';

class PatenteController {
  // CREATE
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { codigo, descricao } = req.body;
      const patente = await Patente.create({ codigo, descricao });
      return res.json(patente);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // LIST (Ordem alfabética pela descrição)
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      // Requisito 23c: ordem alfabética pela descrição
      const patentes = await Patente.find().sort({ descricao: 1 });
      return res.json(patentes);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // UPDATE
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const patente = await Patente.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!patente) {
        return res.status(404).json({ message: "Patente não encontrada" });
      }
      return res.json(patente);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // DELETE
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const patente = await Patente.findByIdAndDelete(id);
      if (!patente) {
        return res.status(404).json({ message: "Patente não encontrada" });
      }
      return res.json({ message: "Patente excluída com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new PatenteController();