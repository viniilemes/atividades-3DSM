import { Router, Request, Response } from "express";
import person from './person';
import car from './car';
import phone from './phone';
import carbyperson from './carbyperson';

const routes = Router();

routes.use("/person", person);
routes.use("/car", car);
routes.use("/phone", phone);
routes.use("/carbyperson", carbyperson);

routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;