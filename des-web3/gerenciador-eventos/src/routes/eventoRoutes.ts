import { Router, Request, Response } from 'express';
import Evento from '../models/Evento';

const router = Router();

router.post('/eventos', async (req: Request, res: Response) => {
  try {
    const novoEvento = new Evento(req.body);
    await novoEvento.save();
    res.status(201).json({ mensagem: 'Evento criado com sucesso!', evento: novoEvento });
  } catch (erro: any) {
    res.status(400).json({ mensagem: 'Erro ao criar evento.', erro: erro.message });
  }
});

router.get('/eventos', async (req: Request, res: Response) => {
  try {
    const { titulo } = req.query as any;
    let eventos;

    if (titulo) {
      eventos = await Evento.find({ titulo: { $regex: titulo, $options: 'i' } });
    } else {
      eventos = await Evento.find();
    }

    res.status(200).json(eventos);
  } catch (erro: any) {
    res.status(500).json({ mensagem: 'Erro ao buscar eventos.', erro: erro.message });
  }
});

router.put('/eventos/:id', async (req: Request, res: Response) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!eventoAtualizado) {
      return res.status(404).json({ mensagem: 'Evento não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Evento atualizado com sucesso!', evento: eventoAtualizado });
  } catch (erro: any) {
    res.status(400).json({ mensagem: 'Erro ao atualizar evento.', erro: erro.message });
  }
});

router.delete('/eventos/:id', async (req: Request, res: Response) => {
  try {
    const eventoDeletado = await Evento.findByIdAndDelete(req.params.id);

    if (!eventoDeletado) {
      return res.status(404).json({ mensagem: 'Evento não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Evento excluído com sucesso!' });
  } catch (erro: any) {
    res.status(500).json({ mensagem: 'Erro ao excluir evento.', erro: erro.message });
  }
});

export default router;
