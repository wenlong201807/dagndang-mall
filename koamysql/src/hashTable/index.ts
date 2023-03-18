class HashMap<V> {
  table: HashNode<V>[] = []
  newCap: number = 0
  readonly INIT_TABLE_CAPCITY = 16

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
            break
          }
          oldHashNode = mdlHashNode
          console.log(oldHashNode)
        }
      }
    }
  }

  get(key: string) {
    let e: HashNode<V>
    const hashVal = this.hash(key)
    if (this.newCap > 0) {
      e = this.table[hashVal & (this.newCap - 1)]
      if (e.hash === hashVal && e.key === key) {
        return e.value
      } else {
      }
      // return (e = this.table[hashVal & (this.newCap - 1)]) ? e.value : undefined
    }
  }

  hash(key: string) {
    const hash = this.hashCode(key)
    return hash ^ (hash >>> 16)
  }

  /**
   * 把字符串 key 转化成一个数字，便于充当数组的索引
   */
  hashCode(key: string) {
    let hash: number = 0
    for (let i = 0; i < key.length; i++) {
      hash = 31 * hash + key.charCodeAt(i)
    }
    return hash
  }

  resize() {
    // 第一次扩容
    if (this.newCap === 0) {
      this.newCap = this.INIT_TABLE_CAPCITY
    } else if (this.newCap === this.INIT_TABLE_CAPCITY) {
      this.newCap = this.newCap << 1 // 扩容两倍
    }
  }
}

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
console.log(hashtable.get('aa'))
export {}
