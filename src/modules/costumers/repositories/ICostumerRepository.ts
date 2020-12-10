import Costumer from '../infra/typeorm/entities/Costumer';

import ICreateCostumerDTO from '../dtos/ICreateCostumerDTO';

export default interface ICostumerRepository {
  findByEmail(email: string): Promise<Costumer | undefined>;
  compareEmail(password: string, user_password: string): Promise<boolean>;
  create(data: ICreateCostumerDTO): Promise<Costumer>;
  save(costumer: Costumer): Promise<Costumer>;
}
