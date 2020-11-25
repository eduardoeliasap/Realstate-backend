import { Request, Response} from 'express';
import CreatePropertyServices from '@modules/properties/services/CreatePropertyServices';

export default class PropertiesController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { costumer_id, realtor_id, contracttype_id, propertytype_id, desc, area, roons, garage, suite, latitude, longitude, price, city_id, state_id, situation, status } = req.body;

      const createProperty = new CreatePropertyServices();

      const property = createProperty.execute({ costumer_id, realtor_id, contracttype_id, propertytype_id, desc, area, roons, garage, suite, latitude, longitude, price, city_id, state_id, situation, status });

      return res.json(property);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
