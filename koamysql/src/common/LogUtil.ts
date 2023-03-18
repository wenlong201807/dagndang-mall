import log4js from 'log4js'
enum LevelInfo {
  'trace' = 'trace',
  'debug' = 'debug',
  'info' = 'info',
  'warn' = 'warn',
  'error' = 'error',
  'fatal' = 'fatal',
}

class LogUtil {
  static logUtil: LogUtil = new LogUtil()
  logInstance!: log4js.Logger // log4js日志 实例
  private constructor() {
    this.config()
  }
  config() {
    log4js.configure({
      appenders: {
        // 输出目的地【追加输出】配置，供categories 用
        console: { type: 'console' },
        debug_file: { type: 'file', filename: 'mylog/debug.log' },
      },
      categories: {
        // 类别
        default: { appenders: ['console','debug_file'], level: LevelInfo.debug },
        info: { appenders: ['console'], level: LevelInfo.info },
        warn: { appenders: ['console'], level: LevelInfo.warn },
      },
    })
  }
  getCategories(level: LevelInfo) {
    // 为什么这里也要传递级别？这不重复？
    // 这传递级别才知道从log4js.configure配置当中找到哪一个级别对应的目的地和相应的信息
    this.logInstance = log4js.getLogger(level)
  }

  debug(ipnut: String) {
    this.getCategories(LevelInfo.debug)
    this.logInstance.debug(ipnut)
  }

  info(ipnut: String) {
    this.getCategories(LevelInfo.info)
    this.logInstance.info(ipnut)
  }

  warn(ipnut: String) {
    this.getCategories(LevelInfo.warn)
    this.logInstance.warn(ipnut)
  }
}

export default LogUtil.logUtil
