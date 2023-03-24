import UserinfoApi from '@/api/userinfoApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import storage, { OPTION } from '@/utils/goodStorageUtil'
export type Userinfo = {
  userid: number
  token: string
  psw: string
  username: string
  address: string
  birth: string
  valid: number
}
type InitUserState = {
  userinfo: Userinfo
}

const initUserState: InitUserState = {
  userinfo: {} as Userinfo,
}

function hasProps(data: any) {
  if (Array.isArray(data)) {
    return Boolean(data.length)
  } else if (data.constructor === Object) {
    return Boolean(Object.getOwnPropertyNames(data).length)
  }
}

export const userinfoStore = defineStore('userinfoStore', {
  state: () => {
    return initUserState
  },
  getters: {
    storeLoginUser: (state: InitUserState) => {
      return hasProps(state.userinfo) ? state.userinfo : storage.get('loginUser')
    },
  },
  actions: {
    async loginAction(username: string, psw: string) {
      const loginUser = { username, psw } as Userinfo
      let result: AxiosResponse<Userinfo> = await UserinfoApi.login(loginUser)
      // 更新state数据，保存本地toekn
      this.userinfo = result.data
      storage.set('loginUser', this.userinfo)
      storage.set('token', result.data.token)
    },
  },
})
