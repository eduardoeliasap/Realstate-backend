import { getCustomRepository } from 'typeorm';
import Realtor from '../entities/Realtor';
import RealtorRepository from '../repositories/RealtorsRepository';
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

class CreateRealtorServices {
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
  }: Request): Promise<Realtor | null> {
    const realtorRepository = getCustomRepository(RealtorRepository);

    const emailExists = await realtorRepository.findByEmail(email);
    if (emailExists) {
      new Promise((_, reject) => reject(new Error('Email already exists!'))).
        catch(error => { console.log('', error.message); });

      return null;
    }

    const hashedPassword = await hash(password, 8);

    const realtor = realtorRepository.create({
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
      creci
    });

    await realtorRepository.save(realtor);

    return realtor;
  }
}

export default CreateRealtorServices;
