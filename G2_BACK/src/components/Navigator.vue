<template>
  <div v-if="!isLoginPage">
    <div
      style="height: 50px; width: 100%"
      class="d-flex align-items-center justify-content-center login position-fixed z-1"
    >
      <div class="col-11 login-wrap d-flex align-items-center justify-content-end">
        <span class="pe-4">{{ adminName }}，您好</span>
        <span @click="logout" class="material-symbols-outlined" style="cursor: pointer">
          login
        </span>
      </div>
    </div>
    <aside class="navBar position-fixed z-2">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/image/logo/logo1-w.png" />
        </router-link>
      </div>

      <nav>
        <ul>
          <router-link to="/administratormanage" active-class="active-link">
            <li>管理員管理</li>
          </router-link>
          <router-link to="/news" active-class="active-link">
            <li>最新消息管理</li>
          </router-link>
          <router-link to="/courseManage" active-class="active-link">
            <li>課程管理</li>
          </router-link>
          <router-link to="/membermanage" active-class="active-link">
            <li>會員管理</li>
          </router-link>
          <router-link to="/OrderManage" active-class="active-link">
            <li>詢價單管理</li>
          </router-link>
          <router-link to="/productManage" active-class="active-link">
            <li>商品管理</li>
          </router-link>
          <router-link to="/quiz" active-class="active-link">
            <li>問答管理</li>
          </router-link>
          <router-link to="/discount" active-class="active-link">
            <li>優惠券管理</li>
          </router-link>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminName: '' // 你可能想要從 localStorage 或 Vuex store 中獲取這個名字
    }
  },
  methods: {
    logout() {
      // 清除 localStorage 中的管理員資料
      localStorage.removeItem('adminData')
      // 跳轉到登入頁面
      this.$router.push('/login')
    },
    updateAdminName() {
      const adminData = JSON.parse(localStorage.getItem('adminData'))
      if (adminData && adminData.admin_name) {
        this.adminName = adminData.admin_name
      }
    }
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login'
    }
  },
  created() {
    this.updateAdminName()
    // 监听路由变化，每次路由变化时更新管理员名称
    this.$router.afterEach(() => {
      this.updateAdminName()
    })
  }
}
</script>

<style scoped lang="scss">
.active-link li {
  background-color: #dc3545;
  color: white;
}
</style>
