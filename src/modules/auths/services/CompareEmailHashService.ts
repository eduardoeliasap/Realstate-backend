import IAuthRepository from '../repositories/IAuthRepository';
import { inject } from 'tsyringe';

class CompareEmailHashService {
  constructor(
    @inject('AuthRepository')
    private authRepository: IAuthRepository,
  ) {}

  public async CompareEmail(password: string, user_password: string, type: string): Promise<boolean | undefined> {
    const passwordMatched = this.authRepository.comparePassword(password, user_password, type);

    return passwordMatched;
  }
}

export default CompareEmailHashService
