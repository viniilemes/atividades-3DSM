// Exemplo de Controller para Person [cite: 673]
import { Request, Response } from "express";
import { Person } from "../models";

class PersonController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    try {
      const document = new Person({ name });
      const resp = await document.save(); // Validações são aplicadas aqui 
      return res.json(resp);
    } catch (error: any) {
      // Tratamento de erro de 'unique' (nome duplicado)
      if (error.code === 11000) {
        return res.json({ message: "Este nome já está em uso" });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const objects = await Person.find().sort({ name: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // ... (implementar 'delete' e 'update' seguindo o exemplo do PDF)
}
export default new PersonController();