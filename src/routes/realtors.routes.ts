import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateRealtorServices from '../services/CreateRealtorServices';
import RealtorsRepository from '../repositories/RealtorsRepository';

const realtorsRouter = Router();

realtorsRouter.get('/', async (req, res) => {
  const realtorRepository = getCustomRepository(RealtorsRepository);
  const realtor = await realtorRepository.find();

  return res.json(realtor);
});

realtorsRouter.post('/', (req, res) => {
  try {
    const { name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id, creci } = req.body;

    const createRealtor = new CreateRealtorServices();

    const realtor = createRealtor.execute({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id, creci });

    return res.json(realtor);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default realtorsRouter;
