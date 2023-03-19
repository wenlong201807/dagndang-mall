import { secondCtgyModel } from './SecCtgyModel'
import { thirdCtgyModel } from './ThirdCtgyModel'

// OneToMany
// 从二级分类查询三级分类
secondCtgyModel.hasMany(thirdCtgyModel, {
  as: 'thirdctgys', // 别名 作用: 此处的别名是子表的接口数据，有多个字段，需要用复数 必须带s
  foreignKey: 'secctgyid', // 外键
})

// ManyToOne
// 三级分类属于二级分类
thirdCtgyModel.belongsTo(secondCtgyModel, {
  foreignKey: 'secctgyid',
  targetKey: 'secondctgyid', // 主键
})

export default async function findSecThrdCtgysByFstCtgyId(firstctgyId: number) {
  const result = await secondCtgyModel.findAll({
    // raw: true, // koa中需要原生输出，这个字段值为false，恰好是默认值
    where: {
      firstctgyId,
    },
    include: [
      // 包含关系
      {
        model: thirdCtgyModel,
        as: 'thirdctgys', // 必须和 // OneToMany 中的别名保持一致
      },
    ],
  })
  console.log('result:', result)
  return result
}

// 测试执行
// findSecThrdCtgysByFstCtgyId(1)
/**
 SELECT 
  `secondctgy`.`secondctgyid`, 
  `secondctgy`.`secctgyname`, 
  `secondctgy`.`firstctgyId`, 
  `thirdctgys`.`thirdctgyid` AS `thirdctgys.thirdctgyid`, 
  `thirdctgys`.` thirdctgyname` AS `thirdctgys.thirdctgyname`,  // 多了一个空格
  `thirdctgys`.`secctgyid` AS `thirdctgys.secctgyid` 
FROM `secondctgy` AS `secondctgy` 
LEFT OUTER JOIN `thirdctgy` AS `thirdctgys` ON 
  `secondctgy`.`secondctgyid` = `thirdctgys`.`secctgyid` 
WHERE `secondctgy`.`firstctgyId` = 1;
 */
