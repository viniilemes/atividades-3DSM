import type { Request, Response } from 'express';
import Disco from '../models/disco.model.js';
import type { IDisco } from '../models/disco.model.js';


export const createDisco = async (req: Request, res: Response) => {
  try {
    const disco: IDisco = new Disco(req.body);
    await disco.save();
    res.status(201).json(disco);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar disco', error });
  }
};

// READ (Listar todos) 
export const getAllDiscos = async (req: Request, res: Response) => {
  try {
    const discos = await Disco.find();
    res.status(200).json(discos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar discos', error });
  }
};

// READ (Buscar por ID - Bônus, útil para editar)
export const getDiscoById = async (req: Request, res: Response) => {
  try {
    const disco = await Disco.findById(req.params.id);
    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }
    res.status(200).json(disco);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar disco', error });
  }
};

// UPDATE [cite: 22]
export const updateDisco = async (req: Request, res: Response) => {
  try {
    const disco = await Disco.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }
    res.status(200).json(disco);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar disco', error });
  }
};

// DELETE [cite: 23]
export const deleteDisco = async (req: Request, res: Response) => {
  try {
    const disco = await Disco.findByIdAndDelete(req.params.id);
    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }
    res.status(200).json({ message: 'Disco excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir disco', error });
  }
};