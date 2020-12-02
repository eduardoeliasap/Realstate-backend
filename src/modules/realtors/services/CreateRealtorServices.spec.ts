import CreateRealtorServices from './CreateRealtorServices';
import FakeRealtorRepository from '../repositories/fakes/FakeRealtorRepository';

describe('Create Realtors', () => {
  it('Should be able to create a new Realtor', async () => {
    const fakeRealtorRepository = new FakeRealtorRepository();
    const createRealtorServices = new CreateRealtorServices(fakeRealtorRepository);

    const realtor = await createRealtorServices.execute({
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
    const fakeRealtorRepository = new FakeRealtorRepository();
    const createRealtorServices = new CreateRealtorServices(fakeRealtorRepository);

    try {
      await createRealtorServices.execute({
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
        createRealtorServices.execute({
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
