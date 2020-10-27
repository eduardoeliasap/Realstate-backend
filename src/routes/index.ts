import { Router } from 'express';
import costumersRouter from './costumers.routes';

const routes = Router();

routes.use('/costumers', costumersRouter);

export default routes;
