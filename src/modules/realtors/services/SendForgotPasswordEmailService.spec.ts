import FakeRealtorRepository from '../repositories/fakes/FakeRealtorRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeRealtorRepository: FakeRealtorRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeRealtorRepository = new FakeRealtorRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeRealtorRepository, fakeMailProvider);
  })

  it('Should be able to recover the password using the email.', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeRealtorRepository.create({
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
      state_id: 1,
      avatar_id: 1,
      status: true
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover the password using non-existing user.', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe2@example.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
