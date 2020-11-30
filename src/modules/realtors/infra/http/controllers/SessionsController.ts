import { Request, Response} from 'express';
import AuthenticateUserServices from '@modules/realtors/services/AuthenticateUserServices';
import CostumersRepository from '../../typeorm/repositories/RealtorsRepository';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password, type } = req.body;

    const costumersRepository = new CostumersRepository();
    const authenticateUser = new AuthenticateUserServices(costumersRepository);
    // const costumersRepository = container.resolve(AuthenticateUserServices);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
      type,
    });

    // delete costumer.password;

    return res.json({ user, token });
  }
}
