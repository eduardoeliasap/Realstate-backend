export default interface IAuthRepository {
  comparePassword(password: string, user_password: string, type: string): Promise<boolean | undefined>;
}
