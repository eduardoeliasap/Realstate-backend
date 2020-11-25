import { Router } from 'express';

import CostumersController from '../controllers/CostumersController';

const costumersRouter = Router();
const costumersController = new CostumersController();

// costumersRouter.get('/', async (req, res) => {
//   const costumerRepository = getRepository(CostumersRepository);
//   const costumer = await costumerRepository.find();

//   return res.json(costumer);
// });

costumersRouter.post('/', costumersController.create);

export default costumersRouter;
