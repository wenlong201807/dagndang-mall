import UserDao from '../dao/UserDao'
import { UserinfoRaw, UserinfoUPRaw, pageIF } from '../raw'

class UserinfoService {
  static UserinfoService = new UserinfoService()

  async addUser(userinfo: UserinfoRaw) {
    return await UserDao.addUser(userinfo);
  }

  async findByUsmAndPsw(userinfo: UserinfoUPRaw) {
    return await UserDao.findByUsmAndPsw(userinfo);
  }

  async findByLike(username: string) {
    return await UserDao.findByLike(username);
  }

  async findByProps() {
    return await UserDao.findByProps();
  }

  async countUserInfo() {
    return await UserDao.countUserInfo();
  }

  async findUserWithPager(page: pageIF) {
    return await UserDao.findUserWithPager(page);
  }
}
export default UserinfoService.UserinfoService
