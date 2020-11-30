// Interface
import Costumer from '../infra/typeorm/entities/Costumer';

import ICreateCostumerDTO from '../dtos/ICreateCostumerDTO';

export default interface ICostumerRepository {
  findByEmail(email: string): Promise<Costumer | undefined>;
  create(data: ICreateCostumerDTO): Promise<Costumer | undefined>;
  save(costumer: Costumer): Promise<Costumer>;
}
