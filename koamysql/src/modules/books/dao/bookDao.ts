import Books from '../../decormodel/books'
import { sequelize } from '../../BaseDao'

class BookDao {
  static bookDao: BookDao = new BookDao()
  async findBooksByThirdCtgyId(thirdctgyid: number, offset: number, pageSize: number) {
    let data: any[] = []
    let dataLength: any[]
    if (thirdctgyid == 0) {
      const sql = `select count(*) from books`
      dataLength = (await sequelize.query(sql))[0]
      data = await Books.findAll({
        raw: true,
        limit: pageSize,
        offset,
      })
    } else {
      const sql = `select count(*) from books where thirdctgyid = ${thirdctgyid}`
      dataLength = (await sequelize.query(sql))[0]
      data = await Books.findAll({
        raw: true,
        where: {
          thirdctgyid,
        },
        limit: pageSize,
        offset,
      })
    }
    const paging = {
      pageNum: offset,
      pageSize,
      length: dataLength[0]['count(*)'],
      hasMoreData: false,
    }
    console.log('data', data)
    if (data.length === 0 || offset > dataLength[0]['count(*)']) {
      console.log('hasMoreData')
      paging.hasMoreData = true
    }

    return { data, paging }
  }
  // insert into userinfo(username, psw, birth) values('lisi', '124', '2000/06/07 10:10:02')

  async findBookRisefall(thirdctgyid: number, risefall: string) {
    if (thirdctgyid == 0) {
      return await Books.findAll({
        raw: true,
        order: [['originalprice', risefall]],
      })
    } else {
      return await Books.findAll({
        raw: true,
        order: [['originalprice', risefall]],
        where: {
          thirdctgyid,
        },
      })
    }
  }

  async findBookDetail(ISBN: string) {
    console.log('dao-book-返回接口最后一关:', ISBN)
    return await Books.findOne({
      raw: true,
      where: {
        ISBN,
      },
    })
  }
}

export default BookDao.bookDao
