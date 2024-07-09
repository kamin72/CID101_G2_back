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
          v-model.trim="search"
        />
        <button class="btn btn-outline-primary" type="button" @click="searchDataResult">
          搜尋
        </button>
      </div>
      <RouterLink to="/addAdministrator">
        <button type="button" class="btn btn-primary">新增</button>
      </RouterLink>
    </div>

    <table class="table mt-5">
      <thead class="table-dark">
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
        <tr v-for="(item, index) in paginatedQuiz" :key="index">
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
                :checked="item.admin_status"
                @change="switchStatus(item)"
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
          <a
            class="page-link text-primary-emphasis"
            aria-label="Previous"
            @click="prevPage"
            :disabled="currentPage == 1"
            style="cursor: pointer"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="setPage(page)"
        >
          <a class="page-link text-primary-emphasis" href="#">{{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link text-primary-emphasis"
            aria-label="Next"
            @click="nextPage"
            :disabled="currentPage == totalPages"
            style="cursor: pointer"
          >
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
      adminData: [],
      searchData: [],
      search: '',
<<<<<<< HEAD
      switchState: true,
      currentPage: 1, // 當前頁碼
      itemsPerPage: 10 // 每頁顯示的資料數量
=======
      switchState: null
>>>>>>> ed66c6b79e5b11b5b320a6dbfbcb67bf7b17bdf5
    }
  },
  created() {},
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
            this.searchData = data.adminData
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
    },
    searchDataResult() {
      if (this.search == '') {
        return (this.searchData = this.adminData)
      }
      this.searchData = this.adminData.filter((data) => {
        return (
          data.admin_no == this.search ||
          data.admin_name.includes(this.search) ||
          data.admin_ac.includes(this.search) ||
          data.admin_access == this.identity
        )
      })
    },
    setPage(page) {
      this.currentPage = page
    },
    nextPage() {
      if (this.currentPage >= 1 && this.currentPage < this.totalPages) {
        this.currentPage++
      } else {
        return
      }
    },
    prevPage() {
      if (this.currentPage > 1 && this.currentPage != 1) {
        this.currentPage--
      } else {
        return
      }
    switchStatus(item) {
      let newStatus
      switch (item.admin_status) {
        case 0:
          newStatus = 1 // 預設啟用
          break
        case 1:
          newStatus = 0 // 帳號未啟用
          break
      }
      item.admin_status = newStatus

      fetch(
        `http://localhost/CID101_G2_php/back/admin/updateStatus.php?status=${newStatus}&admin_no=${item.admin_no}`
      )
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg)
        })
    }
  },
  mounted() {
    this.getAdminData()
  },
  computed: {
    identity() {
      if (this.search == '超級管理員' && this.search != '') {
        return 1
      } else if (this.search == '一般會員' && this.search != '') {
        return 0
      } else {
        return this.search
      }
    },
    totalPages() {
      return Math.ceil(this.adminData.length / this.itemsPerPage)
    },
    paginatedQuiz() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.searchData.slice(startIndex, startIndex + this.itemsPerPage)
    }
  }
}
</script>
