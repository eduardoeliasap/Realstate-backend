import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
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

@injectable()
class AuthenticateUserServices {
  constructor(
    @inject('CostumersRepository')
    private costumerRepository: ICostumersRepository) {}

  public async execute({ email, password, type }: Request): Promise<Response | undefined> {
      const user = await this.costumerRepository.findByEmail(email);
      if (!user) {
        throw new Error('Email not found!');
        // new Promise((_, reject) => reject(new Error('Incorrect email/password combination!'))).
        // catch(error => { console.log('', error.message); });

        // return;
      }

      /*** Pendencia ***/
      // const passwordMatched = await compare(password, user.password);
      // if (!passwordMatched) {
      //   // throw new Error('Password invalid');
      //   new Promise((_, reject) => reject(new Error('Password invalid!'))).
      //   catch(error => { console.log('', error.message); });

      //   return;
      // }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({type}, secret, {
        subject: user.id,
        expiresIn,
      });

      return { user, token };
  }
}

export default AuthenticateUserServices;
