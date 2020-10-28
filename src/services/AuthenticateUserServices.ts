import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import Costumer from '../models/Costumer';

interface Request {
  email: string;
  password: string;
  type: string;
}

interface Response {
  costumer: Costumer;
  token: string;
}

class AuthenticateUserServices {
  public async execute({ email, password, type }: Request): Promise<Response> {
    const costumerRepository = getRepository(Costumer);

    const costumer = await costumerRepository.findOne({ where: { email } });
    if (!costumer) {
      throw new Error('Incorrect email/password combination');
    }

    /*** Pendencia ***/
    // const passwordMatched = await compare(password, costumer.password);
    // if (!passwordMatched) {
    //   throw new Error('Incorrect password invalid');
    // }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({type}, secret, {
      subject: costumer.id,
      expiresIn,
    });

    return { costumer, token };
  }
}

export default AuthenticateUserServices;
