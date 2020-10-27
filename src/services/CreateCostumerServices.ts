import { getCustomRepository } from 'typeorm';
import Costumer from '../models/Costumer';
import CostumerRepository from '../repositories/CostumersRepository';

interface Request {
  name: string;
  phone: string;
  email: string;
  password: string;
}

class CreateCostumerServices {
  public async execute({
    name,
    phone,
    email,
    password,
  }: Request): Promise<Costumer | null> {
    const costumerRepository = getCustomRepository(CostumerRepository);

    const emailExists = await costumerRepository.findByEmail(email);
    if (emailExists) {
      new Promise((_, reject) => reject(new Error('Email already exists!'))).
        catch(error => { console.log('', error.message); });

      return null;
    }

    const costumer = costumerRepository.create({
      name,
      phone,
      email,
      password,
    });

    await costumerRepository.save(costumer);

    return costumer;
  }
}

export default CreateCostumerServices;
