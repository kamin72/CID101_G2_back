<template>
  <div
    style="height: 50px; width: 100%"
    class="d-flex align-items-center justify-content-center login position-fixed z-1"
  >
    <div class="col-11 login-wrap d-flex align-items-center justify-content-end">
      <span class="pe-4">黃韻如，您好</span>
      <span class="material-symbols-outlined" style="cursor: pointer"> login </span>
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
        <router-link to="/" active-class="active-link">
          <li>管理員管理</li>
        </router-link>
        <router-link to="/news" active-class="active-link">
          <li>最新消息管理</li>
        </router-link>
        <router-link to="/courseManage" active-class="active-link">
          <li>課程管理</li>
        </router-link>
        <router-link to="/login" active-class="active-link">
          <li>會員管理</li>
        </router-link>
        <router-link to="/OrderManage" active-class="active-link">
          <li>詢價單管理</li>
        </router-link>
        <router-link to="/productManage" active-class="active-link">
          <li>商品管理</li>
        </router-link>
        <router-link to="" active-class="active-link">
          <li>問答管理</li>
        </router-link>
        <router-link to="/discount" active-class="active-link">
          <li>優惠券管理</li>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.active-link li {
  background-color: #dc3545;
  color: white;
}
</style>
