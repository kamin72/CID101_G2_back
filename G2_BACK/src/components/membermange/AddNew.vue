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
        <option value="超級管理員">超級管理員</option>
        <option value="一般管理員">一般管理員</option>
      </select>
    </div>
    <div class="mt-5 d-flex gap-5" style="width: 100%">
      <button type="button" class="btn btn-primary p-3 fs-4" style="width: 50%" @click="submitForm">
        新增
      </button>
      <button type="button" class="btn btn-secondary fs-4" style="width: 50%" @click="clearForm">
        刪除
      </button>
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
      // 导航到上一页并传递新项的信息
      this.$router.push({
        path: '/',
        query: {
          name: this.name,
          account: this.account,
          password: this.password,
          access: this.access
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
