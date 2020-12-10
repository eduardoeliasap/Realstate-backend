import FakeUserRepository from '../repositories/fakes/FakeCostumersRepository';
import AutehnticateUserService from './AuthenticateUserServices';
import CreateCostumerServices from './CreateCostumerServices';

let fakeCostumersRepository: FakeUserRepository;
let authenticateCostumer: AutehnticateUserService;
let createCostumer: CreateCostumerServices;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeCostumersRepository = new FakeUserRepository();
    authenticateCostumer = new AutehnticateUserService(fakeCostumersRepository);
    createCostumer = new CreateCostumerServices(fakeCostumersRepository);
  })

  it('Should be able to authenticate.', async () => {
    await createCostumer.execute({
      email: 'johndoe2@example.com',
      password: '123456',
      name: 'name',
      neighborhood: 'neighborhood',
      num: 'num',
      phone: 'phone',
      state_id: 0,
      cpfcnpj: 'cpfcnpj',
      address: 'address',
      city_id: 0,
      cep: 'cep',
    });

    const response = await authenticateCostumer.execute({
      email: 'johndoe2@example.com',
      password: '123456',
      type: 'C',
    });

    expect(response).toHaveProperty('token');
  });

  it('Should be able to authenticate.', async () => {
    await createCostumer.execute({
      email: 'johndoe2@example.com',
      password: '123456',
      name: 'name',
      neighborhood: 'neighborhood',
      num: 'num',
      phone: 'phone',
      state_id: 0,
      cpfcnpj: 'cpfcnpj',
      address: 'address',
      city_id: 0,
      cep: 'cep',
    });

    expect(authenticateCostumer.execute({
      email: 'johndoe@example.com',
      password: '123456',
      type: 'C',
    })).rejects.toBeInstanceOf(Error);
  });

  // it('Should not be able to authenticate with invalid password.', async () => {
  //   const fakeUsersRepository = new FakeUserRepository();
  //   const authenticateUser = new AutehnticateUserService(fakeUsersRepository);
  //   const createUser = new CreateUserService(fakeUsersRepository);

  //   await createUser.execute({
  //     name: 'John Doe',
  //     email: 'test@test.com',
  //     password: '123456',
  //   });

  //   const response = await authenticateUser.execute({
  //     email: 'test@test.com',
  //     password: '12345678',
  //   });

  //   expect(response).rejects.toBeInstanceOf(Error);
  // });
});
