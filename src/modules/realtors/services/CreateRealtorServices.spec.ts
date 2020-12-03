import FakeRealtorRepository from '../repositories/fakes/FakeRealtorRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateRealtorServices from './CreateRealtorServices';

describe('Create Realtors', () => {
  it('Should be able to create a new Realtor', async () => {
    const fakeRealtorsRepository = new FakeRealtorRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createRealtor = new CreateRealtorServices(fakeRealtorsRepository, fakeHashProvider);

    const realtor = await createRealtor.execute({
      address: 'address',
      cep: 'cep',
      city_id: 1,
      cpfcnpj: 'cpfcnpj',
      creci: 'creci',
      email: 'email',
      name: 'name',
      neighborhood: 'neighborhood',
      num: 'num',
      password: 'password',
      phone: 'phone',
      state_id: 1
    });

    expect(realtor).toHaveProperty('id');
  });

  it('Should not be able to create a new Realtor with email already exists', async () => {
    const fakeRealtorsRepository = new FakeRealtorRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createRealtor = new CreateRealtorServices(fakeRealtorsRepository, fakeHashProvider);

    try {
      await createRealtor.execute({
        address: 'address',
        cep: 'cep',
        city_id: 1,
        cpfcnpj: 'cpfcnpj',
        creci: 'creci',
        email: 'johndoe@example.com',
        name: 'name',
        neighborhood: 'neighborhood',
        num: 'num',
        password: 'password',
        phone: 'phone',
        state_id: 1
      });

      expect(
        createRealtor.execute({
          address: 'address',
          cep: 'cep',
          city_id: 1,
          cpfcnpj: 'cpfcnpj',
          creci: 'creci',
          email: 'johndoe@example.com',
          name: 'name',
          neighborhood: 'neighborhood',
          num: 'num',
          password: 'password',
          phone: 'phone',
          state_id: 1
        }),
      ).rejects.toBeInstanceOf(Error);
    }
    catch(error) {}
  })
})
