import { Request, Response} from 'express';
import AuthenticateUserServices from '@modules/realtors/services/AuthenticateUserServices';

import CostumersRepository from '../../typeorm/repositories/RealtorsRepository';
import AuthRepository from '@modules/auths/infra/typeorm/repositories/AuthRepository';

import Realtor from '@modules/realtors/infra/typeorm/entities/Realtor';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password, type } = req.body;

    // const costumersRepository = new CostumersRepository();
    // const authRepository = new AuthRepository();

    // const authenticateUser = new AuthenticateUserServices(costumersRepository, authRepository);
    const authenticateUser = container.resolve(AuthenticateUserServices);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
      type,
    });

    // delete costumer.password;

    return res.json({ user, token });
  }
}
