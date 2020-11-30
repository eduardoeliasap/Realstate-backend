import { getCustomRepository } from 'typeorm';
import { container, inject, injectable } from 'tsyringe';
import Realtor from '../infra/typeorm/entities/Realtor';
import IRealtorRepository from '../repositories/IRealtorRepository';
import { hash } from 'bcryptjs';

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
    private realtorRepository: IRealtorRepository) {}

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
      new Promise((_, reject) => reject(new Error('Email already exists!'))).
        catch(error => { console.log('', error.message); });

      return;
    }

    const hashedPassword = await hash(password, 8);

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
