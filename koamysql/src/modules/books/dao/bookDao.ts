import Books from '../../decormodel/books'
import { sequelize } from '../../BaseDao'
import { Op, Sequelize, Silent } from 'sequelize'

import pager, { pagerDecorator } from '../../../common/PageUtil'

class BookDao {
  static bookDao: BookDao = new BookDao()

  async findBookListWithPager(curPageNo: string) {
    // const firstRecNo = pager.getFirstRecNoCurPage(curPageNo)
    // const sql = `select * from books limit ${firstRecNo}, ${pager.PageSize}`
    // const curPageDetaList = (await sequelize.query(sql))[0]
    // console.log('curPageDetaList:', curPageDetaList)

    // const totalRecNumObj: any = (await sequelize.query('select count(ISBN) from books'))[0][0]

    // pager.getTotalPageNum(totalRecNumObj['count(ISBN)'])
    // return curPageDetaList
    const basePageerSql = 'select * from books limit '
    const recTotalNumSql = 'select count(ISBN) from books'
    const countPageField = 'ISBN'
    await this.bookPager(curPageNo, basePageerSql, recTotalNumSql, countPageField)
    // 必须等上述步骤都完成了，才能将结果返回给前端
    return pager.getCurPageData()
  }

  // 正常-未调用： 根据出版社列表，查询对应的图书列表
  async findBooksByPublishIds(publishids: number[]) {
    return await Books.findAll({
      raw: true,
      where: {
        publishid: {
          [Op.in]: publishids
        }
      },
    })
  }

  // 正常-未调用
  async findBooksByAutoCompKeyword(autocompKeyword: string):Promise<Books[]> {
    return await Books.findAll({
      raw: true,
      where: {
        bookname: {
          [Op.like]: `%${autocompKeyword}%`
        }
      },
    })
  }

  @pagerDecorator(sequelize)
  bookPager(curPageNo: string, basePageerSql: string, recTotalNumSql: string, countPageField: string) {
    // return pager.getCurPageData() // 暂时不用
  }

  async findBooksByThirdCtgyId(thirdctgyid: number, offset: number, pageSize: number) {
    let data: any[] = []
    let dataLength: any[]
    if (thirdctgyid == 0) {
      // 排序查询的sql
      // const sortSql = `
      //   select bk.bookname, bk.thirdctgyid
      //   from books bk
      //   where bk.thirdctgyid = 13
      //   order by bk.originalprice desc, bk.monthsalecount desc;
      // `
      // 复合排序：
      // 依据第一组(bk.originalprice desc)排序之后，
      // 如果第二组(bk.monthsalecount desc)内部的排序有相同的，相同的部分继续以第二个分组字段排序

      const sql = `select count(*) from books`
      dataLength = (await sequelize.query(sql))[0]
      data = await Books.findAll({
        // order: [[sortfield, ascOrDesc]], // 排序字段
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

  // 查询一本图书的信息：图书详情页
  async findBookDetail(ISBN: string) {
    return await Books.findOne({
      raw: true,
      where: {
        ISBN,
      },
    })
  }
}

export default BookDao.bookDao
