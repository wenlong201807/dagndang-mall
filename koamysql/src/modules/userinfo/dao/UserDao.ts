import { Op, Sequelize, Silent } from 'sequelize'
import { model } from '../defmodel'
// import model from '../../decormodel/Userinfo'

class UserDao {
  static UserDao: UserDao = new UserDao()
  addUser(userinfo: Userinfo) {
    // model
    return model.create(userinfo)
  }

  // 查询所有用户
  findAllUser() {
    return model.findAll({
      raw: true, // 只看原值 不需要底层掺杂的属性
    })
  }

  // 查询某一项
  findByProps() {
    // 投影查询
    return model.findAll({
      raw: true,
      attributes: ['username', 'psw'], // 指定查询的属性
    })
  }

  findByUsmAndPsw(username: string, psw: string) {
    // 如果确保查出的数据只有一条的话可以用 findOne 没必要用findAll
    return model.findOne({
      raw: true,
      where: { [Op.or]: [{ username }, { psw }] }, // Op是一种条件
    })
  }
  findByLike(key: string) {
    const searchKey = `%${key}%`
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    })
  }

  findByUsmAndAddr(username: string, psw: string) {
    return model.findAll({
      raw: true,
      where: {
        // [Op.or]: [
        //   { username: { [Op.like]: '张%' } },
        //   { psw: { [Op.like]: '%2%' } },
        // ],
        [Op.and]: [{ username }, { psw }],
      },
    })
  }

  countUserInfo() {
    //  select address, count(valid) from userinfo where valid = 1 group by address;
    return model.findAll({
      raw: true,
      group: 'address', // 分组字段
      attributes: [
        'address',
        // 聚合函数
        [Sequelize.fn('count', Sequelize.col('valid')), 'totalcount'], // totalcount 别名
      ], // 属性 聚合查询以属性进行展开
      where: {
        valid: 1,
      },
    })
  }

  findUserWithPager(offset: number, pageSize: number) {
    // select * from userinfo limit 5,3;
    return model.findAll({
      raw: true,
      limit: pageSize,
      offset,
    })
  }
}

export default UserDao.UserDao
export type Userinfo = {
  userid: string
  username: string
  psw: string
  address: string
  valid: string
  birth: Date
}
