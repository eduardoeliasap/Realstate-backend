// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import FakeCostumersRepository from '../repositories/fakes/FakeCostumersRepository';
import CreateCostumerServices from './CreateCostumerServices';

let fakeCostumersRepository: FakeCostumersRepository;
let createCostumer: CreateCostumerServices;

describe('CreateCostumer', () => {
  beforeEach(() => {
    fakeCostumersRepository = new FakeCostumersRepository();
    createCostumer = new CreateCostumerServices(fakeCostumersRepository);
  })

  it('Should be able to create a new costumer.', async () => {
    const costumer = await createCostumer.execute({
      email: 'email',
      name: 'name',
      neighborhood: 'neighborhood',
      num: 'num',
      password: 'password',
      phone: 'phone',
      state_id: 0,
      cpfcnpj: 'cpfcnpj',
      address: 'address',
      city_id: 0,
      cep: 'cep',
    });

    expect(costumer).toHaveProperty('id');
    // expect(costumer?.name).toBe('name');
  });

  it('Should not be able to create a new costumer with email exists.', async () => {
    try {
      await createCostumer.execute({
        email: 'johndoe@example.com',
        name: 'name',
        neighborhood: 'neighborhood',
        num: 'num',
        password: '123456',
        phone: 'phone',
        state_id: 0,
        cpfcnpj: 'cpfcnpj',
        address: 'address',
        city_id: 0,
        cep: 'cep',
      });

      expect(
        createCostumer.execute({
          email: 'johndoe@example.com',
          name: 'name',
          neighborhood: 'neighborhood',
          num: 'num',
          password: '123456',
          phone: 'phone',
          state_id: 0,
          cpfcnpj: 'cpfcnpj',
          address: 'address',
          city_id: 0,
          cep: 'cep',
        }),
      ).rejects.toBeInstanceOf(Error);
    }
    catch (error) {}
  });
})
