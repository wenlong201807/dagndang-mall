// 泛型 V五层传递
class HashMap<V> {
  table: HashNode<V>[] = []
  size: number = 0
  newThr: number = 12
  newCap: number = 0 // hash 的容量
  readonly INIT_TABLE_CAPCITY = 16
  readonly LOCK_FACTOR = 0.75 // 扩容因子 java特点

  put(key: string, value: V) {
    const hashVal = this.hash(key)
    let nodePosition: number
    let oldHashNode: HashNode<V>
    let mdlHashNode: HashNode<V> | any

    if (this.table.length === 0) this.resize() // 首次扩容
    // 如果这个索引位置没有其他节点
    if (!(oldHashNode = this.table[(nodePosition = hashVal & (this.newCap - 1))])) {
      this.table[nodePosition] = new HashNode<V>(hashVal, key, value, undefined) // 创建新节点
    } else {
      // 当oldHashNode 存在
      // 1.当 key 重复时如何处理
      if (key === oldHashNode.key && hashVal === oldHashNode.hash) {
        oldHashNode.value = value
        return oldHashNode.value
      } else {
        // 2.当 key 不同，索引 nodePosition 相同，出现了hash冲突时应该如何解决
        while (true) {
          if (!(mdlHashNode = oldHashNode.next)) {
            oldHashNode.next = new HashNode(hashVal, key, value, undefined)
            console.log('cc')
            // 这里是出口
            break
          }
          oldHashNode = mdlHashNode
          console.log(oldHashNode)
        }
      }
    }

    // 大于扩容阀值，就扩容
    if (++this.size >= this.newThr) {
      this.resize()
    }
  }

  get(key: string) {
    let e: HashNode<V>
    const hashVal = this.hash(key)
    if (this.newCap > 0) {
      e = this.table[hashVal & (this.newCap - 1)]
      // 有此问题：为什么和怎样rehash?
      // 第二次获取相同的值，会报错？？
      if (e.hash === hashVal && e.key === key) {
        return e.value
      } else {
        // 链路取值的流程
        let mdlHashNode: HashNode<V> | undefined = e.next
        if (mdlHashNode) {
          do {
            if (mdlHashNode.key === key) {
              return mdlHashNode.value
            }
          } while ((mdlHashNode = mdlHashNode.next))
        }
      }
      // return (e = this.table[hashVal & (this.newCap - 1)]) ? e.value : undefined
    }
  }

  /**
   * java底层就是如此处理的
   * 目标：降低hash冲突的解决方案
   * @param key
   * @returns
   */
  hash(key: string) {
    const hash = this.hashCode(key)
    return hash ^ (hash >>> 16)
  }

  /**
   * 处理问题1 hash值冲突比例较高【降低hash冲突/hash碰撞】的思路
   *    1. 一般key字符串最好是3-6字符之内
   *    2. 这个数同时具备二进制高16位(前4组0000)和低16位(后4组0000)的特征 [hash ^ hash >>> 16]
   *    3. 根据第2点，这个二进制高16位必须有值，不能全为0，尽量让高位起第4段出现一到两个1的概率增大一些，1的个数不能太多，也不能太少
   * 处理问题2 %效率较低，比位运算低很多
   * 处理问题3 hash & 15 可以保证结果都是小于等于15的
   *
   * 把字符串 key 转化成一个数字，便于充当数组的索引
   */
  hashCode(key: string) {
    let hash: number = 0
    for (let i = 0; i < key.length; i++) {
      hash = 31 * hash + key.charCodeAt(i)
    }
    return hash
  }

  /**
   * 问：为什么将数组的初始值newCap设置为16(java是这样的)，而不是12或者更大呢？
   * 答：
   * 1 不能更大： 空间太大，数据量小的时候，空隙太多，降低查询效率
   * 2 不能12：空间太小，数据量小，也可能冲突
   * 3 为16: 连续性ok 1111
   *
   * 问：当数组元素超过16后，如果扩容？
   * 答：
   *
   * 问：扩容阀值？
   * 答：0.75
   *
   * hans容量
   */
  resize() {
    // 第一次扩容
    if (this.newCap === 0) {
      this.newCap = this.INIT_TABLE_CAPCITY
      this.newThr = this.INIT_TABLE_CAPCITY * this.LOCK_FACTOR // 12;
    } else if (this.newCap === this.INIT_TABLE_CAPCITY) {
      this.newCap = this.newCap << 1 // 扩容两倍
      this.newThr = this.newThr << 1
    }
  }
}

/**
 * 难点 泛型V 五层传递
 * 可能会有其他功能扩展，则使用类
 */
class HashNode<V> {
  hash!: number
  key!: string
  value!: V
  next!: HashNode<V> | undefined
  constructor(_hash: number, _key: string, _value: V, _next?: HashNode<V>) {
    this.hash = _hash
    this.key = _key
    this.value = _value
    this.next = _next
  }
}

const hashtable = new HashMap()

hashtable.put('aa', { name: 'sadfasd' })
hashtable.put('bb', 'beijing')
hashtable.put('cc', 'wum')
hashtable.put('中国', 'china') // 可以存入

hashtable.put('dd', { name:'sadfasd' })
hashtable.put('ee', 'beijing')
hashtable.put('ff', 'wum')
hashtable.put('gg', 'china')

console.log('hashtable', hashtable)
console.log(hashtable.get('中国')) // 会报错？？？
export {}
