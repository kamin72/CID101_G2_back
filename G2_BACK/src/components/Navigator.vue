<template>
  <div v-if="!isLoginPage">
    <div
      style="height: 50px; width: 100%"
      class="d-flex align-items-center justify-content-center login position-fixed z-1"
    >
      <div class="col-11 login-wrap d-flex align-items-center justify-content-end">
        <span class="pe-4">{{ navAdminName }}，您好</span>
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
          <router-link to="/administratormanage" active-class="active-link" v-if="isSuperAdmin == true">
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
      isSuperAdmin: false,
      loginAdminData:[],
      navAdminName: '' 
    }
  },
  methods: {
    logout() {
      this.loginAdminData = '';
      this.navAdminName = '';
      this.isSuperAdmin = false;
      // 清除 localStorage 中的管理員資料
      localStorage.removeItem('loginAdminData')
      localStorage.removeItem('adminData')
      localStorage.removeItem('isSuperAdmin')
      // 跳轉到登入頁面
      this.$router.push('/login')
    },
    updateAdminName() {
      const loginAdminData = JSON.parse(localStorage.getItem('loginAdminData'))
      const isSuperAdmin = JSON.parse(localStorage.getItem('isSuperAdmin'))
      if (loginAdminData && loginAdminData.admin_name) {
        this.navAdminName = loginAdminData.admin_name
        this.loginAdminData = loginAdminData
        if (isSuperAdmin) {
        this.isSuperAdmin = true
        }else{
          this.isSuperAdmin = false
        }
      }
      
    },
    checkLoginStatus() {
      const loginAdminData = JSON.parse(localStorage.getItem('loginAdminData')) 
      if (!loginAdminData) {
        // 如果沒有管理員資料，跳轉到登入頁面
        this.$router.push('/login')
      }
    }
  },
  computed: {
    isLoginPage() {
        return this.$route.path === '/login'
    },
    
  },
  created() {
    this.checkLoginStatus()
    this.updateAdminName()
  },
  mounted() {
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
