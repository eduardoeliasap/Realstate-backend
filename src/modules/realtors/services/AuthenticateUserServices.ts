import { getRepository } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import IRealtorsRepository from '../../realtors/repositories/IRealtorRepository';
import IAuthRepository from '../../auths/repositories/IAuthRepository';
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

    @inject('AuthRepository')
    private authRepository: IAuthRepository
  ) {}

  public async execute({ email, password, type }: Request): Promise<Response | undefined> {
    /* // Costumers Authentication */
      // const costumerRepository = getRepository(Costumer);

      const user = await this.realtorRepository.findByEmail(email);
      if (!user) {
        throw new Error('Email not found');
      }

      /*** Pendencia ***/
      // var bcrypt = require('bcryptjs');
      // const passwordMatched = await bcrypt.compare(password, user.password);
      // if (!passwordMatched) {
      //   throw new Error('Password invalid');
      // }
      const passwordMatched = await this.authRepository.comparePassword(password, user.password, type);
      if (!passwordMatched) {
        throw new Error('Invalid password');
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
