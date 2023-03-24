import { toNumber } from './StringUtil'

import { Sequelize } from 'sequelize'

class Pager {
  static pager: Pager = new Pager()
  /**
   * 0  4 8
   * 1  5 9
   * 2  6 10
   * 3  7 11
   * 4
   */

  private firstRecNoCurPage!: number // 每一页的第一条记录号是多少
  private pageSize: number = 4 // 每页总共最大多少条记录
  private curPageNo: number = 1 // 当前是第几页，默认第一页
  private totalPageNum: number = 0 //
  private curPageDataList: any[] = []

  getFirstRecNoCurPage(curPageNo_: string, pageSize_: string = '0') {
    // 获取每一页第一条记录数
    this.curPageNo = toNumber(curPageNo_) || this.curPageNo
    this.pageSize = toNumber(pageSize_) || this.pageSize
    this.firstRecNoCurPage = (this.curPageNo - 1) * this.pageSize
    return this.firstRecNoCurPage
  }

  get PageSize() {
    return this.pageSize
  }
  // 保存当前数据【返回给前端的分页相关数据】
  saveCurPageData(_curpageDataList: any[]) {
    this.curPageDataList = _curpageDataList
  }
  // 当前页数据[获取后返回给前端的]
  getCurPageData() {
    return {
      curPageNo: this.curPageNo,
      pageSize: this.pageSize,
      totalPageNum: this.totalPageNum,
      curPageDataList: this.curPageDataList,
    }
  }
  // 获取总页数
  getTotalPageNum(totalRecNum: number) {
    if (totalRecNum % this.pageSize === 0) {
      this.totalPageNum = totalRecNum / this.pageSize
    } else {
      this.totalPageNum = Math.floor(this.curPageDataList.length / this.pageSize) + 1
    }
  }
}

const pager = Pager.pager
export default pager

type PageParamsType = [curPageNo: string, basePagerSql: string, recTotalNumSql: string, countPageField: string]
// 分页封装的装饰器
export function pagerDecorator(sequelize: Sequelize) {
  return (targetPrototype: any, methodname: string, dataProps: PropertyDescriptor) => {
    const targetMethods = dataProps.value // 原函数
    dataProps.value = async (...args: PageParamsType) => {
      const [curPageNo, basePagerSql, recTotalNumSql, countPageField] = args

      const firstRecNo = pager.getFirstRecNoCurPage(curPageNo)
      const sql = `${basePagerSql} ${firstRecNo}, ${pager.PageSize}`
      const curPageDetaList = (await sequelize.query(sql))[0]
      const totalRecNumObj: any = (await sequelize.query(`${recTotalNumSql}`))[0][0]
      pager.getTotalPageNum(totalRecNumObj[`count(${countPageField})`])
      pager.saveCurPageData(curPageDetaList)

      // const xx = targetMethods.apply(this) // xx = 这个返回值 return pager.getCurPageData()
    }
  }
}
