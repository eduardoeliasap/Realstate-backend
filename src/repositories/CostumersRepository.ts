import { EntityRepository, Repository } from 'typeorm';
import Costumer from '../models/Costumer';

@EntityRepository(Costumer)
class CostumersRepository extends Repository<Costumer> {
  public async findByEmail(email: string): Promise<Costumer | null> {
    const findCostumer = await this.findOne({
      where: { email },
    });

    return findCostumer || null;
  }

  public async findByDate(date: Date): Promise<Costumer | null> {
    const findCostumer = await this.findOne({
      where: { date },
    });

    return findCostumer || null;
  }
}

export default CostumersRepository;
