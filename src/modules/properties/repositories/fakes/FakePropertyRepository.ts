import { v4 as uuid_v4 } from 'uuid';
import IPropertyRepository from '@modules/properties/repositories/IPropertiesRepository';
import ICreatePropertyDTO from '@modules/properties/dtos/ICreatePropertyDTO';

import Property from '../../infra/typeorm/entities/Property';

// @EntityRepository(Property)
class PropertiesRepository implements IPropertyRepository {
  private properties: Property[] = [];

  public async create(propertyData: ICreatePropertyDTO): Promise<Property | undefined> {
      const property = new Property();

      Object.assign(property, { id: uuid_v4() }, propertyData);

      this.properties.push(property);

      return property;
  }

  public async save(property: Property): Promise<Property> {
    property = new Property();

    return property;
  }
}

export default PropertiesRepository;
