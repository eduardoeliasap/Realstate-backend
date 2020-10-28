import { Router } from 'express';
import CreatePropertyServices from '../services/CreatePropertyServices';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const propertyRouter = Router();

// Garante que todas as rotas necessitam do tokem
propertyRouter.use(ensureAuthenticated);

propertyRouter.get('/', async (req, res) => {

  return res.json({ ok: true });
});

propertyRouter.post('/', (req, res) => {
  try {
    const { costumer_id, realtor_id, contracttype_id, propertytype_id, desc, area, roons, garage, suite, latitude, longitude, price, city_id, state_id, situation, status } = req.body;

    const createProperty = new CreatePropertyServices();

    const property = createProperty.execute({ costumer_id, realtor_id, contracttype_id, propertytype_id, desc, area, roons, garage, suite, latitude, longitude, price, city_id, state_id, situation, status });

    return res.json(property);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default propertyRouter;
