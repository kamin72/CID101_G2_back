<template>
  <div class="100-vh d-flex flex-column align-items-center">
    <div style="width: 200px" class="mt-5 img-wrap">
      <img src="../assets/img/logo/logo2.png" class="w-100" alt="logo" />
    </div>
    <form class="mt-5 col-5" @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="exampleInputAcount" class="form-label">帳號</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputAcount"
          aria-describedby="emailHelp"
          v-model="account"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">密碼</label>
        <input type="password" class="form-control" id="exampleInputPassword" v-model="password" />
      </div>
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="check"
          @change="togglePasswordVisibility"
        />
        <label class="form-check-label" for="check">點我查看</label>
      </div>
      <button type="submit" class="btn btn-primary">提交</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/Login/login.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            account: this.account,
            password: this.password
          })
        })

        const result = await response.json()

        if (result.success) {
          // 登入成功后保存管理员信息到 localStorage
          localStorage.setItem('adminData', JSON.stringify(result.adminData))

          // 登入成功後導航到最新消息頁面
          this.$emit('login', result.adminData)
          this.$router.push('/news') // 導航到最新消息頁面
        } else {
          alert(result.msg)
        }
      } catch (error) {
        console.error('Error:', error)
        alert('登入過程中發生錯誤，請稍後再試')
      }
    },
    togglePasswordVisibility() {
      const passwordInput = document.getElementById('exampleInputPassword')
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'
    }
  }
}
</script>
