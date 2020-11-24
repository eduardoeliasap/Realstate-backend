import { getRepository, Repository } from 'typeorm';

import ICostumerRepository from '@modules/costumers/repositories/ICostumerRepository';

import Costumer from '../entities/Costumer';
import ICreateCostumerDTO from '../../../dtos/ICreateCostumerDTO';

// @EntityRepository(Costumer)
class CostumersRepository implements ICostumerRepository {
  private ormRepository: Repository<Costumer>;

  constructor() {
    this.ormRepository = getRepository(Costumer);
  }

  // password(password: string, password: any) {
  //   throw new Error("Method not implemented.");
  // }
  // id: string | undefined;
  public async findByEmail(email: string): Promise<Costumer | undefined> {
    const costumer = await this.ormRepository.findOne({
      where: { email },
    });

    return costumer;
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
