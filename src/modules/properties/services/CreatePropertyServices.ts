import { getRepository } from 'typeorm';
import { injectable, inject } from 'tsyringe';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
import Property from '../infra/typeorm/entities/Property';

interface Request {
  costumer_id: string;
  realtor_id: string;
  contracttype_id: number;
  propertytype_id: number;
  desc: string;
  area: string;
  roons: number;
  garage: number;
  suite: number;
  latitude: string;
  longitude: string;
  price: string;
  city_id: number;
  state_id: number;
  situation: string;
  status: boolean;
}

@injectable()
class CreatePropertyServices {
  constructor(
    @inject('PropertiesRepository')
    private propertyRepository: IPropertiesRepository) {}

  public async execute({
    costumer_id,
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
      status
  }: Request): Promise<Property | undefined> {
    // const propertyRepository = getRepository(Property);

    const property = this.propertyRepository.create({
      costumer_id,
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
      status
    });

    // await this.propertyRepository.save(property);

    return property;
  }
}

export default CreatePropertyServices;
