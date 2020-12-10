import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ICostumersRepository from '../repositories/ICostumerRepository';
import IAuthRepository from '@modules/auths/repositories/IAuthRepository';

import Costumer from '../infra/typeorm/entities/Costumer';

interface Request {
  email: string;
  password: string;
  type: string;
}

interface Response {
  user: Costumer;
  token: string;
}

@injectable()
class AuthenticateUserServices {
  constructor(
    @inject('CostumersRepository')
    private costumerRepository: ICostumersRepository,

    @inject('AuthRepository')
    private authRepository: IAuthRepository,
  ) {}

  public async execute({ email, password, type }: Request): Promise<Response> {
      const user = await this.costumerRepository.findByEmail(email);
      if (!user) {
        throw new Error('Email not found!');
      }

      const passwordMatched = await this.authRepository.comparePassword(password, user.password, type);
      if (!passwordMatched) {
        throw new Error('Password invalid');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({type}, secret, {
        subject: user.id,
        expiresIn,
      });

      return { user, token };
  }
}

export default AuthenticateUserServices;
