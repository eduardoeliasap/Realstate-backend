import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import CreateCostumerServices from '@modules/costumers/services/CreateCostumerServices';
import CostumersRepository from '@modules/costumers/infra/typeorm/repositories/CostumersRepository';

const costumersRouter = Router();

costumersRouter.get('/', async (req, res) => {
  const costumerRepository = getRepository(CostumersRepository);
  const costumer = await costumerRepository.find();

  return res.json(costumer);
});

costumersRouter.post('/', (req, res) => {
  try {
    const { name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id } = req.body;

    const costumersRepository = new CostumersRepository();
    const createCostumer = new CreateCostumerServices(costumersRepository);

    const costumer = createCostumer.execute({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id });

    return res.json(costumer);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default costumersRouter;
