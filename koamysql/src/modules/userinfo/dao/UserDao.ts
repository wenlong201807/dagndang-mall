import { Op, Sequelize, Silent } from 'sequelize'
// import UserinfoModel from '../../decormodel/Userinfo'
import { model } from '../defmodel'
import { UserinfoRaw, UserinfoUPRaw, pageIF } from '../raw'

class UserDao {
  static UserDao: UserDao = new UserDao()
  addUser(userinfo: UserinfoRaw) {
    // model
    return model.create(userinfo)
  }

  // 查询所有用户
  findAllUser() {
    return model.findAll({
      raw: true, // 只看原值 不需要底层掺杂的属性
    })
  }

  // 查询某一项（投影查询）
  findByProps() {
    // 投影查询
    return model.findAll({
      raw: true,
      attributes: ['username', 'psw'], // 指定查询的属性， 只会返回这两个字段，其他字段内容不返回
    })
  }

  findByUsmAndPsw(userinfo: UserinfoUPRaw) {
    const { username, psw } = userinfo
    // 如果确保查出的数据只有一条的话可以用 findOne 没必要用findAll
    return model.findOne({
      raw: true,
      where: { [Op.and]: [{ username }, { psw }] }, // Op是一种条件
      // where: { [Op.or]: [{ username }, { psw }] }, // Op是一种条件
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
      // attributes: ['username', 'address'], // 只返回 指定的 字段，其他字段内容不返回
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

  // 聚合查询
  // 基础语法: select count(*) as 总用户数 from userinfo;
  countUserInfo() {
    //  select address, count(valid) from userinfo where valid = 1 group by address;
    // 解析上述sql语句
    /*
    count(valid) 统计数量时，如果指定key 的value为null 则不计入总数两中
    count(valid) valid = 1 按照valid 字段 且值 为1的做维度进行统计
    group by address 以address字段为维度 将统计结果分组统计
    select address 有统计维度时，前面的字段只能是分组中出现的字段
    */
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

  findUserWithPager(page: pageIF) {
    const { offset, pageSize } = page
    // select * from userinfo limit 5,3;
    return model.findAll({
      raw: true,
      limit: pageSize,
      offset,
    })
  }
}

export default UserDao.UserDao
