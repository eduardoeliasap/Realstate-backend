import FakeUserRepository from '../repositories/fakes/FaceCostumersRepository';
import AutehnticateUserService from './AuthenticateUserServices';
import CreateCostumerServices from './CreateCostumerServices';

describe('AuthenticateUserService', () => {
  it('Should be able to authenticate.', async () => {
    const fakeCostumersRepository = new FakeUserRepository();
    const authenticateCostumer = new AutehnticateUserService(fakeCostumersRepository);
    const createCostumer = new CreateCostumerServices(fakeCostumersRepository);

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
