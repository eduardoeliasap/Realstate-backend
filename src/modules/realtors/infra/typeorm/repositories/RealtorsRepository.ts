import { Repository, getRepository } from 'typeorm';

import IRealtorRepository from '@modules/realtors/repositories/IRealtorRepository';
import ICreateRealtorDTO from '@modules/realtors/dtos/ICreateRealtorDTO';

import Realtor from '../entities/Realtor';

// @EntityRepository(Realtor)
class RealtorsRepository implements IRealtorRepository {
  // password(password: string, password: any) {
  //   throw new Error("Method not implemented.");
  // }
  // id: string | undefined;

  // At here, my repository do not created
  private ormRepository: Repository<Realtor>;

  constructor() {
    // Here I created my repository
    this.ormRepository = getRepository(Realtor);
  }

  public async findByEmail(email: string): Promise<Realtor | undefined> {
    const realtor = await this.ormRepository.findOne({
      where: { email },
    });

    return realtor;
  }

  public async findById(id: string): Promise<Realtor | undefined> {
    const realtor = await this.ormRepository.findOne(id);

    return realtor;
  }

  public async create({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id,cep, state_id,creci, status }: ICreateRealtorDTO): Promise<Realtor> {
    const user = this.ormRepository.create({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id,cep, state_id,creci, status });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(realtor: Realtor): Promise<Realtor> {
    return this.ormRepository.save(realtor);
  }
}

export default RealtorsRepository;
