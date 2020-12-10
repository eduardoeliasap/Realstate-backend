import { v4 as uuid_v4 } from "uuid";
import ICostumerRepository from '@modules/costumers/repositories/ICostumerRepository';
import ICreateCostumerDTO from '@modules/costumers/dtos/ICreateCostumerDTO';

import Costumer from '../../infra/typeorm/entities/Costumer';

// @EntityRepository(Costumer)
class CostumersRepository implements ICostumerRepository {
  private costumers: Costumer[] = [];

  public async findByEmail(email: string): Promise<Costumer | undefined> {
    try {
      const findCostumer = this.costumers.find(costumer => costumer.email === email);

      return findCostumer;
    } catch (err) { return undefined; }
  }

  public async compareEmail(password: string, user_password: string): Promise<boolean> {
    var bcrypt = require('bcryptjs');
    const passwordMatched = await bcrypt.compare(password, user_password);
    if (!passwordMatched)
      return false;

    return true;
  }

  public async create(costumerData: ICreateCostumerDTO): Promise<Costumer> {
    const costumer = new Costumer();

    Object.assign(costumer, { id: uuid_v4()}, costumerData);

    // costumer.id = uuid();
    // costumer.email = email;
    // costumer.name = name;
    // costumer.neighborhood = neighborhood;
    // costumer.num = num;
    // costumer.password = password;
    // costumer.phone = phone;
    // costumer.state_id = state_id;
    // costumer.cpfcnpj = cpfcnpj;
    // costumer.address = address;
    // costumer.city_id = city_id;
    // costumer.cep = cep;

    this.costumers.push(costumer);

    return costumer;
  }

  public async save(costumer: Costumer): Promise<Costumer> {
    costumer = new Costumer();

    return costumer;
  }
}

export default CostumersRepository;
