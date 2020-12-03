import FakeRealtorRepository from '../repositories/fakes/FakeRealtorRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateRealtorService from './AuthenticateUserServices';
import CreateRealtorServices from './CreateRealtorServices';

describe('AuthenticateUserService', () => {
  it('Should be able to authenticate.', async () => {
    const fakeRealtorsRepository = new FakeRealtorRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateRealtor = new AuthenticateRealtorService(fakeRealtorsRepository, fakeHashProvider);
    const createRealtor = new CreateRealtorServices(fakeRealtorsRepository, fakeHashProvider);

    await createRealtor.execute({
      email: 'johndoe2@example.com',
      address: 'address',
      cep: 'cep',
      city_id: 1,
      cpfcnpj: 'cpfcnpj',
      creci: 'creci',
      name: 'johndoe',
      neighborhood: '',
      num: '',
      password: '123456',
      phone: 'phone',
      state_id: 1
    });

    const response = await authenticateRealtor.execute({
      email: 'johndoe2@example.com',
      password: '123456',
      type: 'R',
    });

    expect(response).toHaveProperty('token');
  });

  it('Should be able to authenticate.', async () => {
    const fakeRealtorsRepository = new FakeRealtorRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateRealtor = new AuthenticateRealtorService(fakeRealtorsRepository, fakeHashProvider);
    const createRealtor = new CreateRealtorServices(fakeRealtorsRepository, fakeHashProvider);

    await createRealtor.execute({
      email: 'johndoe2@example.com',
      address: 'address',
      cep: 'cep',
      city_id: 1,
      cpfcnpj: 'cpfcnpj',
      creci: 'creci',
      name: 'johndoe',
      neighborhood: '',
      num: '',
      password: '123456',
      phone: 'phone',
      state_id: 1
    });

    expect(authenticateRealtor.execute({
      email: 'johndoe@example.com',
      password: '123456',
      type: 'R',
    })).rejects.toBeInstanceOf(Error);
  });

  it('Should not be able to authenticate with invalid password.', async () => {
    const fakeRealtorsRepository = new FakeRealtorRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateRealtor = new AuthenticateRealtorService(fakeRealtorsRepository, fakeHashProvider);
    const createRealtor = new CreateRealtorServices(fakeRealtorsRepository, fakeHashProvider);

    await createRealtor.execute({
      email: 'johndoe2@example.com',
      address: 'address',
      cep: 'cep',
      city_id: 1,
      cpfcnpj: 'cpfcnpj',
      creci: 'creci',
      name: 'johndoe',
      neighborhood: '',
      num: '',
      password: '123456',
      phone: 'phone',
      state_id: 1
    });

    expect(authenticateRealtor.execute({
      email: 'johndoe2@example.com',
      password: '12345678',
      type: 'R',
    })).rejects.toBeInstanceOf(Error);
  });
});
