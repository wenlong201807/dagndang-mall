export type ShopCart = {
  userid: number
  checked: boolean // 接口无此字段，前端需要使用
  shopcartid?: number
  bookisbn: string
  bookname: string
  bookpicname: string
  bookprice: number
  purcharsenum: number
  [keyof: string]: any
}

export const initShopcart: ShopCart[] = []
