import { sequelize } from '../../modules/BaseDao'
import { Op, Sequelize, Silent } from 'sequelize'

import Evaluate from '../decormodel/evaluate'

class EvaluateDao {
  static evaluateDao: EvaluateDao = new EvaluateDao()

  async findEvalReplyList(ISBN: string) {
    // 内连接
    // const sqlInner = `select * from evaluate e inner join dangdang.reply r on e.evaluateid = r.evalid where e.ISBN = '978-7-208'`
    const sqlOuter = `select * from evaluate e left outer join dangdang.reply r on e.evaluateid = r.evalid where e.ISBN = '${ISBN}'`
    const evalReplyList: any[] = (await sequelize.query(sqlOuter))[0]
    console.log('evalReplyList:', evalReplyList)
    return evalReplyList
    // return []
  }

}

export default EvaluateDao.evaluateDao

/** findEvalReplyList 需要做数据格式转换
"data": [
  {
      "evaluateid": 1,
      "content": "好书",
      "evaluator": "文龙",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "300",
      "evaluatedegree": 1,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": 4,
      "replycontent": "好书111",
      "replydate": "2023-06-10",
      "evalid": 1,
      "replyor": "文龙666"
  },
  {
      "evaluateid": 1,
      "content": "好书",
      "evaluator": "文龙",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "300",
      "evaluatedegree": 1,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": 5,
      "replycontent": "好书555",
      "replydate": "2023-06-15",
      "evalid": 1,
      "replyor": "文龙666"
  },
  {
      "evaluateid": 1,
      "content": "好书",
      "evaluator": "文龙",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "300",
      "evaluatedegree": 1,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": 6,
      "replycontent": "好书666",
      "replydate": "2023-06-16",
      "evalid": 1,
      "replyor": "文龙666"
  },
  {
      "evaluateid": 1,
      "content": "好书",
      "evaluator": "文龙",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "300",
      "evaluatedegree": 1,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": 7,
      "replycontent": "好书777",
      "replydate": "2023-06-17",
      "evalid": 1,
      "replyor": "文龙666"
  },
  {
      "evaluateid": 1,
      "content": "好书",
      "evaluator": "文龙",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "300",
      "evaluatedegree": 1,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": 8,
      "replycontent": "好书888",
      "replydate": "2023-06-18",
      "evalid": 1,
      "replyor": "文龙666"
  },
  {
      "evaluateid": 2,
      "content": "好书2",
      "evaluator": "文龙208",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "400",
      "evaluatedegree": 2,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": null,
      "replycontent": null,
      "replydate": null,
      "evalid": null,
      "replyor": null
  },
  {
      "evaluateid": 3,
      "content": "好书3",
      "evaluator": "文龙208",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "500",
      "evaluatedegree": 3,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": null,
      "replycontent": null,
      "replydate": null,
      "evalid": null,
      "replyor": null
  },
  {
      "evaluateid": 9,
      "content": "好书1",
      "evaluator": "文龙208",
      "ISBN": "978-7-208",
      "headportrait": "wangboyu.png",
      "givealikenum": "300",
      "evaluatedegree": 1,
      "pubdate": "2023-01-09T00:00:00.000Z",
      "isanonymous": 0,
      "replyid": null,
      "replycontent": null,
      "replydate": null,
      "evalid": null,
      "replyor": null
  }
]


目标格式
const resultArr = [
  {
    evaluateid: 3,
    content: '好书3',
    evaluator: '文龙208',
    ISBN: '978-7-208',
    headportrait: 'wangboyu.png',
    givealikenum: '500',
    evaluatedegree: 3,
    pubdate: '2023-01-09T00:00:00.000Z',
    isanonymous: 0,
    replyList: [
      {
        replyid: null, // 去掉这样的数据
        replycontent: null,
        replydate: null,
        evalid: null,
        replyor: null,
      },
      {
        replyid: 8, // 保留这样的数据
        replycontent: '好书888',
        replydate: '2023-06-18',
        evalid: 1,
        replyor: '文龙666',
      },
    ],
  },
]

*/
