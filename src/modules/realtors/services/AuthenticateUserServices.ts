import { getRepository } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import IRealtorsRepository from '../../realtors/repositories/IRealtorRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Realtor from '../../realtors/infra/typeorm/entities/Realtor';

interface Request {
  email: string;
  password: string;
  type: string;
}

interface Response {
  user: Realtor;
  token: string;
}

@injectable()
class AuthenticateUserServices {
  constructor(
    @inject('RealtorsRepository')
    private realtorRepository: IRealtorsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password, type }: Request): Promise<Response | undefined> {
    /* // Costumers Authentication */
      // const costumerRepository = getRepository(Costumer);

      const user = await this.realtorRepository.findByEmail(email);
      if (!user) {
        throw new Error('Incorrect email');
      }

      /*** Pendencia ***/
      // const hashedPassword = await hash(password, 8);
      const passwordMatched = await this.hashProvider.compareHash(password, user.password);
      // console.log(hashedPassword);
      // console.log(user.password);

      if (!passwordMatched) {
        throw new Error('Password invalid');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({type}, secret, {
        subject: user.id,
        expiresIn,
      });

      return { user, token };
  //   } else {

  //     /* // Realtor Authentication */

  //     // const realtorRepository = getRepository(Realtor);

  //     const realtor = await this.realtorRepository.findByEmail(email);
  //     if (!realtor) {
  //       throw new Error('Incorrect email/password combination');
  //     }

  //     // console.log(realtor);

  //     const passwordMatched = await compare(password, realtor.password);
  //     if (!passwordMatched) {
  //       throw new Error('Incorrect password invalid');
  //     }

  //     const { secret, expiresIn } = authConfig.jwt;

  //     const token = sign({type}, secret, {
  //       subject: realtor.id,
  //       expiresIn,
  //     });

  //     return { user: realtor, token };
  }
}

export default AuthenticateUserServices;
