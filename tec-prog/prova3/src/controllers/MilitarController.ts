import { Request, Response } from 'express';
import Militar from '../models/Militar';

class MilitarController {
  // CREATE
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, idade, email, fone } = req.body;
      const militar = await Militar.create({ nome, idade, email, fone });
      return res.json(militar);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // LIST (Ordem alfabética)
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      // Requisito 23a: ordem alfabética
      const militares = await Militar.find().sort({ nome: 1 });
      return res.json(militares);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // UPDATE
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body; // Ou req.params, dependendo da sua rota, mas o padrão costuma ser body
      const militar = await Militar.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!militar) {
        return res.status(404).json({ message: "Militar não encontrado" });
      }
      return res.json(militar);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // DELETE
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body; // Padrão visto em aula geralmente usa body para delete também
      const militar = await Militar.findByIdAndDelete(id);
      if (!militar) {
        return res.status(404).json({ message: "Militar não encontrado" });
      }
      return res.json({ message: "Militar excluído com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new MilitarController();