<template>
  <div class="container">
    <p class="fs-1 fw-bolder">編輯</p>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">建立日期</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="staticEmail"
          :value="adminData[index]?.build_date"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">修改日期</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="staticEmail"
          :value="adminData[index]?.update_date"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">編號</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="staticEmail"
          :value="adminData[index]?.admin_no"
        />
      </div>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label fw-bolder">姓名</label>
      <!-- <input type="text" class="form-control" id="name" v-model="adminData[index].admin_name" /> -->
      <input type="text" class="form-control" id="name" v-model="name" />
    </div>
    <div class="mb-3">
      <label for="account" class="form-label fw-bolder">帳號</label>
      <!-- <input type="text" class="form-control" id="account" v-model="adminData[index].admin_ac" /> -->
      <input type="text" class="form-control" id="account" v-model="account" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label fw-bolder">密碼</label>
      <!-- <input type="text" class="form-control" id="password" v-model="adminData[index].admin_pw" /> -->
      <input type="text" class="form-control" id="password" v-model="password" />
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">權限</label>
      <select
        class="form-select"
        aria-label="Default select example"
        placeholder="選擇權限"
        v-model="access"
      >
        <option :value="access" selected>{{ switchIdentity(access) }}</option>
        <option value="1">超級管理員</option>
        <option value="0">一般管理員</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="status" class="form-label fw-bolder">狀態</label>
      <select
        class="form-select"
        aria-label="Default select example"
        placeholder="選擇帳號狀態"
        v-model="status"
      >
        <option :value="status" selected>{{ switchStatus(status) }}</option>
        <option value="1">啟用</option>
        <option value="0">停用</option>
      </select>
    </div>
    <div class="mt-5 mb-5 d-flex gap-5" style="width: 100%">
      <button type="button" class="btn btn-primary fs-4" style="width: 50%" @click="updateData">
        儲存
      </button>
      <RouterLink
        to="/administratorManage"
        type="button"
        class="btn btn-secondary fs-4"
        style="width: 50%"
        >返回</RouterLink
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['index'],
  data() {
    return {
      name: null,
      password: null,
      account: null,
      access: null,
      status: null
    }
  },
  methods: {
    switchIdentity(index) {
      const idMap = {
        0: '一般會員',
        1: '超級管理員'
      }
      return idMap[index]
    },
    switchStatus(index) {
      const statusMap = {
        0: '停用',
        1: '啟用'
      }
      return statusMap[index]
    },
    updateData() {
      const formData = {
        name: this.name,
        password: this.password,
        account: this.account,
        access: this.access,
        status: this.status
      }
      const url = `${import.meta.env.VITE_API_URL}/admin/updateAdminData.php?index=${this.index}`
      const form = new URLSearchParams(formData)

      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: form
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            alert(data.msg)
          } else {
            alert(data.msg)
          }
        })
    },
    assignData() {
      this.name = this.adminData[this.index].admin_name
      this.password = this.adminData[this.index].admin_pw
      this.account = this.adminData[this.index].admin_ac
      this.access = this.adminData[this.index].admin_access
      this.status = this.adminData[this.index].admin_status
    }
  },
  computed: {
    adminData() {
      return JSON.parse(localStorage.getItem('adminData'))
    }
  },
  mounted() {
    this.assignData()
  }
}
</script>
