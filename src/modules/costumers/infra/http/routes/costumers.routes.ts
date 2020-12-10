import { Router } from 'express';

import CostumersController from '../controllers/CostumersController';

const costumersRouter = Router();
const costumersController = new CostumersController();

costumersRouter.post('/', costumersController.create);

export default costumersRouter;
