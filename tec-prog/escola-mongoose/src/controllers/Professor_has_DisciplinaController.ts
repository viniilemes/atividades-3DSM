import { Request, Response } from "express";
import { Professor_has_Disciplina } from "../models";

class Professor_has_DisciplinaController {
    public async create(req: Request, res: Response): Promise<any> {
        const { professor, disciplina } = req.body;
        try {
            const document = new Professor_has_Disciplina({ professor, disciplina });
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            return res.json({ message: error.message || error });
        }
    }

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const objects = await Professor_has_Disciplina.find()
                .populate("professor")
                .populate("disciplina")
                .select("professor disciplina");
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.body;
        try {
            const object = await Professor_has_Disciplina.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Vínculo excluído com sucesso" });
            } else {
                return res.json({ message: "Vínculo inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id, professor, disciplina } = req.body;
        try {
            const document = await Professor_has_Disciplina.findById(id);
            if (!document) {
                return res.json({ message: "Vínculo inexistente" });
            }
            document.professor = professor;
            document.disciplina = disciplina;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            return res.json({ message: error.message || error });
        }
    }
}

export default new Professor_has_DisciplinaController();
