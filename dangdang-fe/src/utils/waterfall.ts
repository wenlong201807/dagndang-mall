type columnHeightObjType = Record<number, number>
export default class Waterfall {
  static getImgElements(itemElements: Element[]) {
    const imgElements: HTMLImageElement[] = []
    itemElements.forEach((el) => {
      imgElements.push(...(el.getElementsByTagName('img') as any))
    })
    return imgElements
  }
  static getAllImg(imgElements: HTMLImageElement[]) {
    return imgElements.map((imgElement) => {
      return imgElement.src
    })
  }
  static onComplateImgs(imgs: string[]) {
    const promiseAll: any = []
    imgs.forEach((img, index) => {
      if (img) {
        promiseAll[index] = new Promise((resolve, reject) => {
          const imageObj = new Image()
          imageObj.src = img
          imageObj.onload = () => {
            resolve({
              img,
              index,
            })
          }
          imageObj.onerror = () => {
            reject('图片加载出问题了')
          }
        })
      }
    })
    return Promise.all(promiseAll)
  }

  static getMinHeightColumn(columnHeightObj: columnHeightObjType) {
    const minHeight = Waterfall.getMinHeight(columnHeightObj)
    return Object.keys(columnHeightObj).find((key) => {
      return columnHeightObj[parseInt(key)] === minHeight
    })!
  }

  static getMinHeight(columnHeightObj: columnHeightObjType) {
    const columnHeightArr = Object.values(columnHeightObj)
    return Math.min(...columnHeightArr)
  }
  static getMaxHeight(columnHeightObj: columnHeightObjType) {
    const columnHeightArr = Object.values(columnHeightObj)
    return Math.max(...columnHeightArr)
  }
}
