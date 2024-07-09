<template>
  <div class="container">
    <p class="fs-1 fw-bolder">新增</p>
    <div class="mb-3">
      <label for="name" class="form-label fw-bolder">姓名</label>
      <input type="text" class="form-control" id="name" v-model="name" />
    </div>
    <div class="mb-3">
      <label for="account" class="form-label fw-bolder">帳號</label>
      <input type="text" class="form-control" id="account" v-model="account" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label fw-bolder">密碼</label>
      <input type="text" class="form-control" id="password" v-model="password" />
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">權限</label>
      <select class="form-select" aria-label="Default select example" v-model="access">
        <option value="1">超級管理員</option>
        <option value="0">一般管理員</option>
      </select>
    </div>
    <div class="mt-5 d-flex gap-5" style="width: 100%">
      <button
        to="/administratorManage"
        type="button"
        class="btn btn-primary p-2 fs-4"
        style="width: 50%"
        @click="submitForm"
      >
        新增
      </button>
      <router-link
        to="/administratorManage"
        type="button"
        class="btn btn-secondary fs-4"
        style="width: 50%"
        @click="clearForm"
      >
        返回
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      account: '',
      password: '',
      access: ''
    }
  },
  methods: {
    submitForm() {
      const formData = {
        name: this.name,
        account: this.account,
        password: this.password,
        access: this.access
      }
      const form = new URLSearchParams(formData)
      const url = `${import.meta.env.VITE_API_URL}/admin/creatAdmin.php`
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
            this.$router.push('/addAdministrator')
          } else {
            alert(data.msg)
            this.$router.push('/administratorManage')
          }
        })
    },
    clearForm() {
      this.name = ''
      this.account = ''
      this.password = ''
      this.access = ''
    }
  }
}
</script>
