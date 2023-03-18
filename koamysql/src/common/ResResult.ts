enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
}

// 可优化TODO：如何做到不引用却可直接使用
class ResResult {
  static success(data: any = undefined, msg: any = 'success msg') {
    const code: Code = Code.SUCCESS
    return { data, msg, code }
  }
  static fail(msg: any = 'fail msg') {
    const code: Code = Code.SERVERERROR
    return { data: {}, msg, code }
  }
}

export let { success, fail } = ResResult
