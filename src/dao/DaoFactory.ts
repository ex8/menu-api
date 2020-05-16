import { UserDao } from '../apps/users'

export class DaoFactory {
  static getUserDao(): UserDao {
    return new UserDao()
  }
}
