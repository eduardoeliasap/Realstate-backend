import bcrypt from 'bcryptjs';

import IAuthRepository from '../../../repositories/IAuthRepository';

class AuthRepository implements IAuthRepository {

  constructor() {

  }

  public async comparePassword(password: string, user_password: string, type: string): Promise<boolean | undefined> {

    const passwordMatched = await bcrypt.compare(password, user_password);
    if (!passwordMatched) {
      return false;
    }

    return true;
  }
}

export default AuthRepository;
