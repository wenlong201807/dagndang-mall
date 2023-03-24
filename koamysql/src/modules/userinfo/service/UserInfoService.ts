import jwt from 'jsonwebtoken'
import UserDao from '../dao/UserDao'
import { UserinfoRaw, UserinfoUPRaw, pageIF } from '../raw'

class UserinfoService {
  static UserinfoService = new UserinfoService()

  async login(userinfo: UserinfoUPRaw) {
    const r = await UserDao.findOneUser(userinfo)
    this.createJWTtoken(r!)
    return r
  }

  createJWTtoken(userifo: any) {
    const token: string = jwt.sign({ data: userifo }, 'dragon', { expiresIn: '10ms', header: { alg: 'HS256', typ: 'JWT' } })
    // const token: string = jwt.sign({ data: userifo }, 'dragon', { expiresIn: '30h', header: { alg: 'HS256', typ: 'JWT' } })
    userifo.token = token
  }

  async addUser(userinfo: UserinfoRaw) {
    return await UserDao.addUser(userinfo)
  }

  async findByUsmAndPsw(userinfo: UserinfoUPRaw) {
    return await UserDao.findByUsmAndPsw(userinfo)
  }

  async findByLike(username: string) {
    return await UserDao.findByLike(username)
  }

  async findByProps() {
    return await UserDao.findByProps()
  }

  async countUserInfo() {
    return await UserDao.countUserInfo()
  }

  async findUserWithPager(page: pageIF) {
    return await UserDao.findUserWithPager(page)
  }
}
export default UserinfoService.UserinfoService
