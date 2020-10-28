import { getCustomRepository } from 'typeorm';
import Costumer from '../models/Costumer';
import CostumerRepository from '../repositories/CostumersRepository';
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
}

class CreateCostumerServices {
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
    state_id
  }: Request): Promise<Costumer | null> {
    const costumerRepository = getCustomRepository(CostumerRepository);

    const emailExists = await costumerRepository.findByEmail(email);
    if (emailExists) {
      new Promise((_, reject) => reject(new Error('Email already exists!'))).
        catch(error => { console.log('', error.message); });

      return null;
    }

    const hashedPassword = await hash(password, 8);

    const costumer = costumerRepository.create({
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
      state_id
    });

    await costumerRepository.save(costumer);

    return costumer;
  }
}

export default CreateCostumerServices;
