<template>
  <div>
    <LoginView v-if="!isLoggedIn" @login="handleLogin" />
    <div v-else>
      <Navigator />
      <keep-alive>
        <RouterView v-if="$route.meta.keepAlive" />
      </keep-alive>
      <RouterView v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Navigator from '@/components/Navigator.vue'
import LoginView from '@/views/LoginView.vue'

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  components: {
    RouterView,
    Navigator,
    LoginView
  },
  methods: {
    handleLogin(loginAdminData) {
      // 登入成功後調用此方法設置 isLoggedIn 為 true
      this.isLoggedIn = true
      // 存儲管理員數據
      localStorage.setItem('loginAdminData', JSON.stringify(loginAdminData))
      // 導航到後台首頁
      if (this.$route.path === '/login') {
        this.$router.push('/news')
      }
    },
    checkAuth() {
      // 檢查 localStorage 中是否有管理員資訊
      const loginAdminData = localStorage.getItem('loginAdminData')
      return loginAdminData !== null
    }
  },
  created() {
    this.isLoggedIn = this.checkAuth()
    if (!this.isLoggedIn && this.$route.path !== '/login') {
      // 如果未登录且不在登录页，则重定向到登录页
      this.$router.push('/login')
    }
  }
}
</script>
