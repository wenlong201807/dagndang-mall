class Flexible {
  static flexible = new Flexible()
  maxFontSize: number = 40
  constructor() {
    this.initUseRem()
  }
  initUseRem() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded')
      const html = document.querySelector('html') as HTMLElement
      let fontSize = window.innerWidth / 10
      fontSize = fontSize > this.maxFontSize ? this.maxFontSize : fontSize
      html.style.fontSize = fontSize + 'px'
    })
  }
}

export default Flexible.flexible
