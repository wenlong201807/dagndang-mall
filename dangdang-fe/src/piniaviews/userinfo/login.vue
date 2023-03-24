<template>
  <div class="login_contain">
    <div>登录页面</div>
    <div class="input_wrap">
      <input v-model="username" type="text" placeholder="用户名" />
    </div>
    <div class="input_wrap">
      <input v-model="psw" type="text" placeholder="密码" />
    </div>
    <div class="input_out_wrap"></div>
    <button @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
import storage from '../../utils/goodStorageUtil'
import { reactive, toRefs } from 'vue'
import { userStore } from '../../piniastore/userinfo/index'
import router from '../../router'

const { username, psw } = toRefs(
  reactive({
    username: '',
    psw: '',
  })
)

async function login() {
  console.log(username.value, psw.value)
  await userStore().loginAction(username.value, psw.value)
  // 后台管理系统模式
  if (storage.get('token')) {
    router.push('/ctgy')
  }
}
</script>

<style scoped lang="scss">
.login_contain {
  text-align: center;

  height: 400px;
  width: 300px;
  margin: 90px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;

  .input_wrap {
    // width: 100%;
    // height: 40px;
    // border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    margin-bottom: 30px;

    input {
      // border: none;
      width: 80%;
    }
  }
}
</style>
