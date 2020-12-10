import { getCustomRepository } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import Costumer from '../infra/typeorm/entities/Costumer';
import ICostumerRepository from '../repositories/ICostumerRepository';
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

@injectable()
class CreateCostumerServices {
  constructor(
    @inject('CostumersRepository')
    private costumerRepository: ICostumerRepository) {}

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
  }: Request): Promise<Costumer | undefined> {
    // const costumerRepository = getCustomRepository(CostumerRepository);

    const emailExists = await this.costumerRepository.findByEmail(email);
    if (emailExists) {
      throw new Error('Email already exists!');
    }

    const hashedPassword = await hash(password, 8);

    const costumer = this.costumerRepository.create({
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

    // await this.costumerRepository.save(costumer);

    return costumer;
  }
}

export default CreateCostumerServices;
