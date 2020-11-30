// Interface
import Property from '../infra/typeorm/entities/Property';

import ICreatePropertyDTO from '../dtos/ICreatePropertyDTO';

export default interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property | undefined>;
  save(property: Property): Promise<Property>;
}
