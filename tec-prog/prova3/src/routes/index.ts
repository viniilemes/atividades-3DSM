import { Router, Request, Response } from "express";
import militar from "./militar";
import soldado from "./soldado";
import patente from "./patente";

const routes = Router();

// Rotas para cada entidade
routes.use("/militar", militar);
routes.use("/soldado", soldado);
routes.use("/patente", patente);

// Rota de teste (opcional, mas útil para verificar se a API está rodando)
routes.use("/", (_: Request, res: Response) => res.json({ date: new Date() }));

export default routes;