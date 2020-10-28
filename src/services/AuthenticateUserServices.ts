import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import Costumer from '../models/Costumer';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Costumer;
  token: string;
}

class AuthenticateUserServices {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Costumer);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email invalid');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect password invalid');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserServices;
