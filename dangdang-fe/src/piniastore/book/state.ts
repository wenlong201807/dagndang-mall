interface style {
  left: number
  top: number
}

export interface BookInfo {
  ISBN: string
  bookisbn?: any
  bookname: string
  author: string
  publishid: number
  publishername: string
  monthsalecount: number
  bookpicname: string
  secondctgyid: number
  thirdctgyid: number
  originalprice: number
  discount: number
  discountprice: number
  _style: style
  purcharsenum: number
  data?: any
}
