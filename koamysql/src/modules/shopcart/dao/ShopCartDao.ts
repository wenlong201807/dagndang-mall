import { sequelize } from '../../../modules/BaseDao'
import ShopCart from '../../../modules/decormodel/shopcart'
import { ShopCartRaw, ShopCartRaw_ } from '../raw'
import { combine } from '../../commontypes'

class ShopCartDao {
  static shopCartDao: ShopCartDao = new ShopCartDao()

  async findCurUserShopCartList(userid: number) {
    return await ShopCart.findAll({
      raw: true,
      where: {
        userid,
      },
    })
  }

  async addBookToShopCart(shopCart: ShopCartRaw): Promise<[any, any]> {
    const sql = `insert into shopcart(bookisbn, bookname, bookpicname ,bookprice, userid, purcharsenum) 
    values('${shopCart.bookisbn}', '${shopCart.bookname}', '${shopCart.bookpicname}', ${shopCart.bookprice}, ${shopCart.userid}, ${shopCart.purcharsenum})`
    return await sequelize.query(sql)
  }

  async appOrSubtrBookFrmShopCart(shopCart: ShopCartRaw_): Promise<[any, any]> {
    const sql = `update shopcart set purcharsenum = ${shopCart.purcharsenum} where shopcartid = ${shopCart.shopcartid}`
    return await sequelize.query(sql)
  }
  async deOneBookFrmSc(shopcartid: number) {
    return ShopCart.destroy({
      where: {
        shopcartid
      },
    })
  }
}

export default ShopCartDao.shopCartDao
