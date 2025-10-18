import type { Request, Response } from 'express';
import axios from 'axios';

const API_KEY = process.env.API_KEY?.trim();

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'O nome da cidade é obrigatório.' });
  }

  console.log('[weatherController] Received city param:', city);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(String(city))}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    console.log('[weatherController] Calling OpenWeather API:', API_URL);
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error: any) {
    // Log detalhado para diagnosticar
    console.error('[weatherController] Error calling OpenWeather:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Melhor diagnóstico de erros: se o erro vier da API do OpenWeather, repassar a mensagem
    if (error.response) {
      const status = error.response.status;
      const msg = error.response.data?.message || 'Erro ao consultar a API externa.';
      return res.status(status).json({ message: msg });
    }

    res.status(500).json({ message: 'Erro interno ao buscar clima.' });
  }
};