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
      <input type="text" class="form-control" id="name" :value="adminData[index]?.admin_name" />
    </div>
    <div class="mb-3">
      <label for="account" class="form-label fw-bolder">帳號</label>
      <input type="text" class="form-control" id="account" :value="adminData[index]?.admin_ac" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label fw-bolder">密碼</label>
      <input type="text" class="form-control" id="password" :value="adminData[index]?.admin_pw" />
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">權限</label>
      <select class="form-select" aria-label="Default select example" placeholder="選擇權限">
        <option selected>{{ switchIdentity(adminData[index]?.admin_access) }}</option>
        <option value="1">超級管理員</option>
        <option value="2">一般管理員</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">狀態</label>
      <select class="form-select" aria-label="Default select example" placeholder="選擇帳號狀態">
        <option selected>{{ switchStatus(adminData[index]?.admin_status) }}</option>
        <option value="1">啟用</option>
        <option value="2">停用</option>
      </select>
    </div>
    <div class="mt-5 mb-5 d-flex gap-5" style="width: 100%">
      <button type="button" class="btn btn-primary fs-4" style="width: 50%">儲存</button>
      <RouterLink type="button" class="btn btn-secondary fs-4" style="width: 50%">取消</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index'],
  data() {
    return {}
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
    }
  },
  computed: {
    adminData() {
      return JSON.parse(localStorage.getItem('adminData'))
    }
  },
  mounted() {}
}
</script>
