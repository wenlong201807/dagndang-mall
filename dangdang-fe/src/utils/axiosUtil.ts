import axios,{ AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios'
import conf from '../config'
import { message } from '../components/message/index'
// import { message } from '@/components/message/index'
const SERVER_ERR = '请求服务器的网址错误或网络连接失败'

interface AxiosRequestConfig_ extends AxiosRequestConfig {
  // isMock 并不存在 AxiosRequestConfig 里面
  isMock: boolean
}
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']
type ReqFn = (url: string, isMock: boolean, data?: any) => AxiosPromise<any>
interface ReqExecute {
  get: ReqFn
  post: ReqFn
  put: ReqFn
  delete: ReqFn
  patch: ReqFn
}

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExecute
  constructor() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      delete: (): any => {},
      patch: (): any => {},
      put: (): any => {},
    }
    this.createAxiosInstance()
    this.beforeReqIntercpt()
    this.beforeResponseIntercpt()
    this.reqPrepare()
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 })
  }
  /** 1.请求开始之前的请求拦截 */
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request: any) => {
      return request
    })
  }
  /** 2.数据响应之前的响应拦截器 */
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { data, msg, code } = response.data
        if (code === 200) {
          return response.data
        }
        if (code === 500) {
          message('error', msg, 4000)
          return
        } else {
          message('error', '发生了未知错误', 4000)
          return
        }
      },
      (err: string) => {
        // 中途出错
        message('error', SERVER_ERR + err, 4000)
      }
    )
  }
  /** 3.发送请求给服务器 get post put delete patch */
  sendRequest(options: AxiosRequestConfig_) {
    if (conf.env === 'production') {
      this.axiosInstance.defaults.baseURL = conf.baseApi
    } else if (conf.env === 'development') {
      const isMock: boolean = options.isMock || conf.isMock
      this.axiosInstance.defaults.baseURL = isMock ? conf.mockBaseApi : conf.baseApi
    }
    return this.axiosInstance(options) // 返回一个 AxiosPromise<any> 对象
  }
  /** 4.深入灵活应用 TS 完成请求method类型自动提示*/
  reqPrepare() {
    return methods.forEach((method) => {
      this.request[method] = (url, isMock, data) => {
        return this.sendRequest({
          url,
          isMock,
          method,
          data,
        })
      }
    })
  }
}

console.log(conf)

export default AxiosUtil.axiosUtil.request
