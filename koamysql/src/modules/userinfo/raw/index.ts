// import {UserinfoModel as Userinfo} from '../defmodel/newIndex'
import Userinfo from '@/modules/decormodel/Userinfo'

// export type UserinfoRaw = Omit<Userinfo, 'userid'>
export type UserinfoRaw = Pick<Userinfo, 'username' | 'psw' | 'address' | 'valid' | 'birth' | 'token'>
export type UserinfoUPRaw = Pick<Userinfo, 'username' | 'psw'>
export type pageIF = {
  offset: number
  pageSize: number
}
