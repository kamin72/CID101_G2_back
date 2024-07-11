<template>
  <!-- <div>
    <LoginView v-if="!isLoggedIn" @login="handleLogin" /> -->
    <!-- <div v-else> -->
      <Navigator />
      <keep-alive>
        <RouterView v-if="$route.meta.keepAlive" />
      </keep-alive>
      <RouterView v-if="!$route.meta.keepAlive" />
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { RouterView } from 'vue-router'
import Navigator from '@/components/Navigator.vue'
// import LoginView from '@/views/LoginView.vue'

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  components: {
    RouterView,
    Navigator,
    // LoginView
  },
  methods: {
    handleLogin(adminData) {
      // 登入成功後調用此方法設置 isLoggedIn 為 true
      this.isLoggedIn = true
      // 存儲管理員數據
      localStorage.setItem('adminData', JSON.stringify(adminData))
      // 導航到後台首頁
      this.$router.push('/admin/dashboard')
    },
    checkAuth() {
      // 檢查 localStorage 中是否有管理員資訊
      const adminData = localStorage.getItem('adminData')
      return adminData !== null
    }
  },
  mounted() {
    // 檢查用戶是否已經登入
    this.isLoggedIn = this.checkAuth()
    if (this.isLoggedIn) {
      // 如果已登入，直接導航到後台首頁
      this.$router.push('/admin/dashboard')
    }
  }
}
</script>
