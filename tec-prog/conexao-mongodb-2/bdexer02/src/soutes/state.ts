import { Router } from "express";
import controller from "../controllers/StateController";

const routes = Router();
routes.post('/', controller.create);
routes.get('/', controller.list);
// ...

export default routes;