import { v4 as uuid_v4 } from 'uuid'

import IRealtorRepository from '@modules/realtors/repositories/IRealtorRepository';
import ICreateRealtorDTO from '@modules/realtors/dtos/ICreateRealtorDTO';

import Realtor from '../../infra/typeorm/entities/Realtor';

class RealtorsRepository implements IRealtorRepository {
  private realtors: Realtor[] = [];
  public async findByEmail(email: string): Promise<Realtor | undefined> {
    try{
      const findRealtor = this.realtors.find(realtor => realtor.email === email)

      return findRealtor;
    }
    catch (err) { return undefined; }
  }

  public async findById(id: string): Promise<Realtor | undefined> {
    const realtor = this.realtors.find(realtor => realtor.id === id)

    return realtor;
  }

  public async create(realtorData: ICreateRealtorDTO): Promise<Realtor> {
    const realtor = new Realtor();

    Object.assign(realtor, { id: uuid_v4() }, realtorData);

    this.realtors.push(realtor);

    return realtor;
  }

  public async save(realtor: Realtor): Promise<Realtor> {
    realtor = new Realtor();

    return realtor;
  }
}

export default RealtorsRepository;
