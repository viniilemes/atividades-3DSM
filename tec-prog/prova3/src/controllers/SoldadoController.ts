import { Request, Response } from 'express';
import Soldado from '../models/Soldado';
import Militar from '../models/Militar'; // Necessário para garantir que a ref exista se for deletar em cascata manual (opcional)

class SoldadoController {
  // CREATE
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { cim, altura, militar } = req.body;
      const soldado = await Soldado.create({ cim, altura, militar });
      return res.json(soldado);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // LIST (Com dados do Militar)
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      // Requisito 23b: dados dos Militares relacionados (populate)
      const soldados = await Soldado.find().populate('militar');
      return res.json(soldados);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // UPDATE
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const soldado = await Soldado.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!soldado) {
        return res.status(404).json({ message: "Soldado não encontrado" });
      }
      return res.json(soldado);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // DELETE
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      // Requisito 26 pede para excluir o soldado e o militar relacionado.
      // Primeiro achamos o soldado para saber quem é o militar
      const soldado = await Soldado.findById(id);
      
      if (!soldado) {
        return res.status(404).json({ message: "Soldado não encontrado" });
      }

      // Exclui o militar associado (Requisito do teste CURL no item 26)
      if (soldado.militar) {
          await Militar.findByIdAndDelete(soldado.militar);
      }

      // Exclui o soldado
      await Soldado.findByIdAndDelete(id);

      return res.json({ message: "Soldado e Militar relacionado excluídos com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new SoldadoController();