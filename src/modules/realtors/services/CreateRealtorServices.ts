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
class CreateRealtorServices {
  constructor(
    @inject('RealtorsRepository')
    private realtorRepository: IRealtorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    phone,
    email,
    password,
    cpfcnpj,
    address,
    neighborhood,
    num,
    city_id,
    cep,
    state_id,
    creci,
  }: Request): Promise<Realtor | undefined> {

    const emailExists = await this.realtorRepository.findByEmail(email);
    if (emailExists) {
      throw new Error('Email already exists!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const realtor = await this.realtorRepository.create({
      name,
      phone,
      email,
      password: hashedPassword,
      cpfcnpj,
      address,
      neighborhood,
      num,
      city_id,
      cep,
      state_id,
      creci,
      avatar_id: 1,
      status: false,
    });

    return realtor;
  }
}

export default CreateRealtorServices;
