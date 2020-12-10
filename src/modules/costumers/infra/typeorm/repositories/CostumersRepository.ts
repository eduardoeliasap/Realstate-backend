import { getRepository, Repository } from 'typeorm';

import ICostumerRepository from '@modules/costumers/repositories/ICostumerRepository';

import Costumer from '../entities/Costumer';
import ICreateCostumerDTO from '../../../dtos/ICreateCostumerDTO';

class CostumersRepository implements ICostumerRepository {
  private ormRepository: Repository<Costumer>;

  constructor() {
    this.ormRepository = getRepository(Costumer);
  }

  public async findByEmail(email: string): Promise<Costumer | undefined> {
    const costumer = await this.ormRepository.findOne({
      where: { email }
    });

    return costumer;
  }

  public async compareEmail(password: string, user_password: string): Promise<boolean> {
    var bcrypt = require('bcryptjs');
    const passwordMatched = await bcrypt.compare(password, user_password);
    if (!passwordMatched)
      return false;

    return true;
  }

  public async findByDate(date: Date): Promise<Costumer | undefined> {
    const costumer = await this.ormRepository.findOne({
      where: { date },
    });

    return costumer;
  }

  public async create({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id }: ICreateCostumerDTO): Promise<Costumer> {
    const user = this.ormRepository.create({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(costumer: Costumer): Promise<Costumer> {
    return this.ormRepository.save(costumer);
  }
}

export default CostumersRepository;
