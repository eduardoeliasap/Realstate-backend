import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import Costumer from '../models/Costumer';
import Realtor from '../models/Realtor';

interface Request {
  email: string;
  password: string;
  type: string;
}

interface Response {
  token: string;
  user: Realtor | Costumer;
}

class AuthenticateUserServices {
  public async execute({ email, password, type }: Request): Promise<Response> {
    /* // Costumers Authentication */
    if (type === "C") {
      const costumerRepository = getRepository(Costumer);

      const costumer = await costumerRepository.findOne({ where: { email } });
      if (!costumer) {
        throw new Error('Incorrect email/password combination');
      }

      /*** Pendencia ***/
      const passwordMatched = await compare(password, costumer.password);
      if (!passwordMatched) {
        throw new Error('Incorrect password invalid');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({type}, secret, {
        subject: costumer.id,
        expiresIn,
      });

      return { user: costumer, token };
    } else {

      /* // Realtor Authentication */

      const realtorRepository = getRepository(Realtor);

      const realtor = await realtorRepository.findOne({ where: { email } });
      if (!realtor) {
        throw new Error('Incorrect email/password combination');
      }

      // console.log(realtor);

      const passwordMatched = await compare(password, realtor.password);
      if (!passwordMatched) {
        throw new Error('Incorrect password invalid');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({type}, secret, {
        subject: realtor.id,
        expiresIn,
      });

      return { user: realtor, token };
    }
  }
}

export default AuthenticateUserServices;
