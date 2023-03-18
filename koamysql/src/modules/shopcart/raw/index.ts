import ShopCart from '@/modules/decormodel/shopcart'

export type ShopCartRaw = Pick<ShopCart, 'bookisbn' | 'bookname' | 'bookprice' | 'userid' | 'purcharsenum' | 'bookpicname'>
export type ShopCartRaw_ = Pick<ShopCart, 'shopcartid' | 'bookname' | 'bookprice' | 'userid' | 'purcharsenum' | 'bookpicname'>
