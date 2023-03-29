interface BaseConf {
  baseApi: string // 基础配置
  mockBaseApi: string // mock 配置
}
interface EnvConf {
  development: BaseConf
  test: BaseConf
  production: BaseConf
}

class AllConf {
  env!: keyof EnvConf
  isMock: boolean = false
  baseApi!: string
  mockBaseApi!: string
}

class EnvConfigClass {
  static envConfigClass: EnvConfigClass = new EnvConfigClass()
  readonly curEnv = (import.meta.env.MODE as keyof EnvConf)|| 'production';
  // readonly curEnv = import.meta.env.MODE === 'development' ? 'development' : 'production'
  envConf!: EnvConf
  allConf!: AllConf

  constructor() {
    this.initConf()
    this.getAllConf()
  }

  initConf() {
    this.envConf = {
      development: {
        baseApi: '/dang',
        mockBaseApi: 'https://www.fastmock.site/mock/a244a48ca0f6b7efaa1d57b9e57b2c8b/dangdang/',
      },
      test: {
        baseApi: 'http://test:80/dang/',
        mockBaseApi: '',
      },
      production: {
        baseApi: '/',
        mockBaseApi: '',
      },
    }
  }
  getAllConf() {
    this.allConf = {
      env: this.curEnv,
      isMock: false,
      ...this.envConf[this.curEnv],
    }
  }
}

export default EnvConfigClass.envConfigClass.allConf
