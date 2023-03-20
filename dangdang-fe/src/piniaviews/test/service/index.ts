import { Ref, ref } from 'vue'
class Test {
  static test: Test = new Test()
  config = 1
  setConfig() {
    console.log(this.config)
  }
  setConfig2() {
    console.log('setConfig2')
  }
}

export default Test.test
