import { EntityRepository, Repository } from 'typeorm';
import Realtor from '../models/Realtor';

@EntityRepository(Realtor)
class RealtorsRepository extends Repository<Realtor> {
  public async findByEmail(email: string): Promise<Realtor | null> {
    const findRealtor = await this.findOne({
      where: { email },
    });

    return findRealtor || null;
  }
}

export default RealtorsRepository;
