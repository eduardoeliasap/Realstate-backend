import FakeRealtorRepository from '../repositories/fakes/FakeRealtorRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateRealtorServices from './CreateRealtorServices';

let fakeRealtorsRepository: FakeRealtorRepository;
let fakeHashProvider: FakeHashProvider;

let createRealtor: CreateRealtorServices;

describe('Create Realtors', () => {
  beforeEach(() => {
    fakeRealtorsRepository = new FakeRealtorRepository();
    fakeHashProvider = new FakeHashProvider();

    createRealtor = new CreateRealtorServices(fakeRealtorsRepository, fakeHashProvider);
  });

  it('Should be able to create a new Realtor', async () => {
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
