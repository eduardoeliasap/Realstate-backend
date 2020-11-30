import { Request, Response} from 'express';
import { container } from 'tsyringe';
import RealtorsRepository from '../../typeorm/repositories/RealtorsRepository';
import CreateRealtorServices from '@modules/realtors/services/CreateRealtorServices';

export default class RealtorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id, creci } = req.body;

      // const realtorRepository = new RealtorsRepository();
      // const createRealtor = new CreateRealtorServices(realtorRepository);
      const createRealtor = container.resolve(CreateRealtorServices);
      const realtor = createRealtor.execute({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id, creci });

      return res.json(realtor);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
