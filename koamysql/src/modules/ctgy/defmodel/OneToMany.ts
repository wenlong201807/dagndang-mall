import { secondCtgyModel } from './SecCtgyModel'
import { thirdCtgyModel } from './ThirdCtgyModel'

// OneToMany
// 从二级分类查询三级分类
secondCtgyModel.hasMany(thirdCtgyModel, {
  as: 'thirdctgys', // 别名
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
    // raw: true,
    where: {
      firstctgyId,
    },
    include: [
      // 包含关系
      {
        model: thirdCtgyModel,
        as: 'thirdctgys',
      },
    ],
  })
  console.log(result)
  return result
}
