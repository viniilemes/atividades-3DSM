// Controller para State 
import { Request, Response } from "express";
import { State } from "../models";

class StateController {
  // Cria um novo estado (pode incluir cidades e distritos aninhados)
  public async create(req: Request, res: Response): Promise<Response> {
    /* Exemplo de body: 
      {
        "name": "São Paulo",
        "cities": [
          { "name": "São Paulo", "districts": [{ "name": "Centro" }] },
          { "name": "Campinas", "districts": [] }
        ]
      }
    */
    try {
      const document = new State(req.body);
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este nome de estado já está em uso" });
      }
      return res.json({ message: error.message });
    }
  }

  // Lista todos os estados e seus subdocumentos
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const objects = await State.find();
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // ... (implementar 'delete' e 'update' para State) ...
}
export default new StateController();