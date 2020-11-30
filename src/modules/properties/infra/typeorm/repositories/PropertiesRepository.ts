import { Repository, getRepository } from 'typeorm';

import IPropertyRepository from '@modules/properties/repositories/IPropertiesRepository';
import ICreatePropertyDTO from '@modules/properties/dtos/ICreatePropertyDTO';

import Property from '../entities/Property';

// @EntityRepository(Property)
class PropertiesRepository implements IPropertyRepository {
  // password(password: string, password: any) {
  //   throw new Error("Method not implemented.");
  // }
  // id: string | undefined;

  // At here, my repository do not created
  private ormRepository: Repository<Property>;

  constructor() {
    // Here I created my repository
    this.ormRepository = getRepository(Property);
  }

  public async create({ costumer_id,
    realtor_id,
    contracttype_id,
    propertytype_id,
    desc,
    area,
    roons,
    garage,
    suite,
    latitude,
    longitude,
    price,
    city_id,
    state_id,
    situation,
    status }: ICreatePropertyDTO): Promise<Property> {
    const user = this.ormRepository.create({ costumer_id,
      realtor_id,
      contracttype_id,
      propertytype_id,
      desc,
      area,
      roons,
      garage,
      suite,
      latitude,
      longitude,
      price,
      city_id,
      state_id,
      situation,
      status });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(property: Property): Promise<Property> {
    return this.ormRepository.save(property);
  }
}

export default PropertiesRepository;
