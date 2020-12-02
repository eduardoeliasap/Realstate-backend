import FakePropertyRepository from '../repositories/fakes/FakePropertyRepository';
import CreatePropertyServices from './CreatePropertyServices';

describe('CreateProperties', () => {
  it('Should be able to create a new property', async () => {
    const fakePropertyRepository = new FakePropertyRepository();
    const createProperty = new CreatePropertyServices(fakePropertyRepository);

    const property = await createProperty.execute({
      area: 'area',
      city_id: 1,
      contracttype_id: 1,
      costumer_id: '123',
      desc: 'desc',
      garage: 1,
      latitude: 'latitude',
      longitude: 'longitude',
      price: 'price',
      propertytype_id: 1,
      realtor_id: '123',
      roons: 1,
      situation: 'situation',
      state_id: 1,
      status: true,
      suite: 1
    });

    expect(property).toHaveProperty('id');
  })
})
