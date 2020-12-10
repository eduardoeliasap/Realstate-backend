import { Request, Response} from 'express';
import { container } from 'tsyringe';
import CreateCostumerServices from '@modules/costumers/services/CreateCostumerServices';

export default class CostumersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id } = req.body;

      // const costumersRepository = new CostumersRepository();
      // const createCostumer = new CreateCostumerServices(costumersRepository);
      const createCostumer = container.resolve(CreateCostumerServices);

      const costumer = createCostumer.execute({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id });

      return res.json(costumer);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
