import Realtor from '../infra/typeorm/entities/Realtor';

import ICreateRealtorDTO from '../dtos/ICreateRealtorDTO';

export default interface IRealtorsRepository {
  findByEmail(email: string): Promise<Realtor | undefined>;
  findById(id: string): Promise<Realtor | undefined>;
  create(data: ICreateRealtorDTO): Promise<Realtor | undefined>;
  save(realtor: Realtor): Promise<Realtor>;
}
