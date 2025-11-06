// Controller para City (manipula subdocumentos) 
import { Request, Response } from "express";
import { State } from "../models";

class CityController {
  // Adiciona uma nova cidade a um estado existente
  public async create(req: Request, res: Response): Promise<Response> {
    // Espera o ID do estado e os dados da nova cidade
    const { stateId, name } = req.body;

    try {
      const state = await State.findById(stateId);
      if (!state) {
        return res.json({ message: "Estado não encontrado" });
      }

      // Adiciona a nova cidade ao array de subdocumentos 
      state.cities.push({ name, districts: [] });

      const resp = await state.save(); // Salva o documento 'State' pai
      return res.json(resp);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // Lista cidades de um estado específico
  public async list(req: Request, res: Response): Promise<Response> {
    const { stateId } = req.body; // Recebe o ID do estado
    try {
      const state = await State.findById(stateId).select("cities");
      if (!state) {
        return res.json({ message: "Estado não encontrado" });
      }
      return res.json(state.cities);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

}
export default new CityController();