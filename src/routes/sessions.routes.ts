import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password, type } = request.body;

  const authenticateUser = new AuthenticateUserServices();

  const { token } = await authenticateUser.execute({
    email,
    password,
    type,
  });

  // delete costumer.password;

  return response.json({ token });
});

export default sessionsRouter;
