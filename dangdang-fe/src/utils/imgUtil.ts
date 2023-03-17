import goodStorage from 'good-storage'
enum Enum {
  IMG_LIST = 'imgList',
}
export class ImgUtil {
  static imgList: Record<string, string> = {}
  static getImg(imgName: string) {
    return ImgUtil.imgList[imgName]
  }
  static storageImgList() {
    this.imgList = goodStorage.get(Enum.IMG_LIST) || {}
    if (this.isEmpty()) {
      this.loadAllImg()
      goodStorage.set(Enum.IMG_LIST, this.imgList)
    }
  }
  static isEmpty(): Boolean {
    return !Object.getOwnPropertyNames(this.imgList).length
  }
  static loadAllImg() {
    const imgMap = import.meta.globEager('../assets/img/**/*.png')
    let absolutePath: string = ''
    Object.values(imgMap).forEach((img) => {
      absolutePath = (img as any).default
      if (absolutePath) {
        const imgName = absolutePath.substring(
          absolutePath.lastIndexOf('/') + 1
        )
        this.imgList[imgName] = absolutePath
      }
    })
    console.log(this.imgList)
  }
}
