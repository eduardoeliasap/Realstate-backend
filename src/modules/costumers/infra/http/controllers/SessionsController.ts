import { Request, Response} from 'express';
import { container } from 'tsyringe';
import AuthenticateUserServices from '@modules/costumers/services/AuthenticateUserServices';
import CostumersRepository from '../../typeorm/repositories/CostumersRepository';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password, type } = req.body;

    const costumersRepository = new CostumersRepository();
    const authenticateUser = new AuthenticateUserServices(costumersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
      type,
    });

    // delete costumer.password;

    return res.json({ user, token });
  }
}
