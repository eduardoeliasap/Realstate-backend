import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateCostumerServices from '../services/CreateCostumerServices';
import CostumersRepository from '../repositories/CostumersRepository';

const costumersRouter = Router();

costumersRouter.get('/', async (req, res) => {
  const costumerRepository = getCustomRepository(CostumersRepository);
  const costumer = await costumerRepository.find();

  return res.json(costumer);
});

costumersRouter.post('/', (req, res) => {
  try {
    const { name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id } = req.body;

    const createCostumer = new CreateCostumerServices();

    const costumer = createCostumer.execute({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id });

    return res.json(costumer);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default costumersRouter;
