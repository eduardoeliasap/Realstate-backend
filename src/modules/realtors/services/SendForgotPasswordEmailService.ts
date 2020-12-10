import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IRealtorRepository from '../repositories/IRealtorRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IRealtorRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    // @inject('UserTokensRepository')
    // private userTokensRepository: IRealtorTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void | undefined> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (!checkUserExists)
      throw new Error('Email address not exists');

    // await this.userTokensRepository.generate(checkUserExists.id);

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
  }
}

export default SendForgotPasswordEmailService;
