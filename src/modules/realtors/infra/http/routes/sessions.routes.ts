import { Router } from 'express';

import RealtorsRepository from '@modules/realtors/infra/typeorm/repositories/RealtorsRepository';
//import CostumersRepository from '@modules/costumers/infra/typeorm/repositories/CostumersRepository';
import AuthenticateUserServices from '@modules/costumers/services/AuthenticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password, type } = request.body;

  const realtorRepository = new RealtorsRepository();
  const authenticateUser = new AuthenticateUserServices(realtorRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
    type,
  });

  // delete costumer.password;

  return response.json({ user, token });
});

export default sessionsRouter;
