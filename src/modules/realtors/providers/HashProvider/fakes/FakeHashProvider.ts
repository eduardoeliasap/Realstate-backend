import bcrypt from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCriptyHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    // return bcrypt.compareSync(payload, hashed);
    return payload === hashed;
  }
}
