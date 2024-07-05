<template>
  <div class="container">
    <span class="fs-1 fw-bolder">管理員管理</span>
    <div class="d-flex gap-3 justify-content-end">
      <div class="input-group z-0 col-6 w-auto">
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with two button addons"
        />
        <button class="btn btn-outline-primary" type="button">搜尋</button>
      </div>
      <RouterLink to="/addAdministrator">
        <button type="button" class="btn btn-primary">新增</button>
      </RouterLink>
    </div>

    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">管理員編號</th>
          <th scope="col">姓名</th>
          <th scope="col">帳號</th>
          <th scope="col">權限等級</th>
          <th scope="col">狀態</th>
          <th scope="col" style="text-align: center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in adminData" :key="index">
          <td scope="row">{{ item.admin_no }}</td>
          <td>{{ item.admin_name }}</td>
          <td>{{ item.admin_ac }}</td>
          <td>{{ switchIdentity(item.admin_access) }}</td>
          <td>
            <div class="form-check form-switch col">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="switchState"
              />
            </div>
          </td>
          <td class="d-flex gap-2 justify-content-center">
            <RouterLink :to="{ path: '/editAdministrator', query: { index: index } }">
              <button type="button" class="btn btn-primary">編輯</button>
            </RouterLink>
            <button type="button" class="btn btn-secondary" @click="clearData(index)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link text-primary-emphasis" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link text-primary-emphasis" href="#">1</a></li>
        <li class="page-item"><a class="page-link text-primary-emphasis" href="#">2</a></li>
        <li class="page-item"><a class="page-link text-primary-emphasis" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link text-primary-emphasis" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entries: [],
      adminData: [],
      switchState: true
    }
  },
  created() {
    // const { name, account, access } = this.$route.query
    // if (name && account && access) {
    //   this.entries.push({ name, account, access, switchState: true })
    // }
  },
  methods: {
    clearData(index) {
      const url = `http://localhost/CID101_G2_php/back/admin/deleteAdminData.php?index=${index}`
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            alert(data.msg)
          }
        })
    },
    getAdminData() {
      const url = 'http://localhost/CID101_G2_php/back/admin/getAdminData.php'
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else {
            this.adminData = data.adminData
            localStorage.setItem('adminData', JSON.stringify(this.adminData))
            // console.log(this.adminData)
          }
        })
    },
    switchIdentity(index) {
      const idMap = {
        0: '一般會員',
        1: '超級管理員'
      }
      return idMap[index]
    }
  },
  mounted() {
    this.getAdminData()
  }
}
</script>
