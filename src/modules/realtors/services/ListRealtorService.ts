import { getCustomRepository } from 'typeorm';
import "reflect-metadata";
import { inject, injectable } from 'tsyringe';
import Realtor from '../infra/typeorm/entities/Realtor';

import IRealtorRepository from '../repositories/IRealtorRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  name: string;
  phone: string;
  email: string;
  password: string;
  cpfcnpj: string;
  address: string;
  neighborhood: string;
  num: string;
  city_id: number;
  cep: string;
  state_id: number;
  creci: string;
}

@injectable()
class ListRealtorServices {
  constructor(
    @inject('RealtorsRepository')
    private realtorRepository: IRealtorRepository,
  ) {}

  public async find(): Promise<Realtor[] | undefined> {

    const realtor = this.realtorRepository.findAll();

    return realtor;
  }
}

export default ListRealtorServices;
