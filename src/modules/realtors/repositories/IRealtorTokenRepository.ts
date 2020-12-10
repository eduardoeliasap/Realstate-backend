import UserToken from '../infra/typeorm/entities/RealtorToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>
}
