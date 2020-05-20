import { UserDao } from '../apps/users'

export default class DaoFactory {
  static getUserDao(): UserDao {
    return new UserDao()
  }
}
