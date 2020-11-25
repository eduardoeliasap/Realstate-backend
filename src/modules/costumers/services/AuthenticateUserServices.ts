import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ICostumersRepository from '../repositories/ICostumerRepository';

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

class AuthenticateUserServices {
  constructor(
    private costumerRepository: ICostumersRepository) {}

  public async execute({ email, password, type }: Request): Promise<Response> {
    /* // Costumers Authentication */
      // const costumerRepository = getRepository(Costumer);

      const user = await this.costumerRepository.findByEmail(email);
      if (!user) {
        throw new Error('Incorrect email/password combination');
      }

      /*** Pendencia ***/
      const passwordMatched = await compare(password, user.password);
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
