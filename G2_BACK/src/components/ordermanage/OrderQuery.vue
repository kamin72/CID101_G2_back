<template>
  <div class="d-flex justify-content-between">
    <div class="mt-3 w-50">
      <label for="access" class="form-label fw-bolder">來源</label>
      <select
        class="form-select"
        aria-label="Default select example"
        @change="fetchOrderData($event)"
      >
        <option value="0" selected>全部</option>
        <option v-for="item in identity" :key="item.value" :value="item.value">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="input-group z-0 w-auto h-25 align-self-end">
      <input
        type="text"
        class="form-control"
        placeholder=""
        aria-label="Example text with two button addons"
        v-model.trim="content"
        @keyup.enter="searchList"
      />
      <button class="btn btn-outline-primary" type="button" @click="searchList">搜尋</button>
    </div>
  </div>
  <table class="table mt-5">
    <thead>
      <tr class="table-dark">
        <th scope="col">詢價單編號</th>
        <th scope="col">姓名</th>
        <th scope="col">連絡電話</th>
        <th scope="col">EMAIL</th>
        <th scope="col">狀態</th>
        <th scope="col" style="text-align: center">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in paginatedQuiz" :key="index">
        <th scope="row">{{ item.cart_id }}</th>
        <td>{{ item.cart_name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.email }}</td>
        <td>{{ getCartStatus(item.cart_status) }}</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink :to="{ path: '/editOrder', query: { cartId: item.cart_id } }">
            <button type="button" class="btn btn-primary">編輯</button>
          </RouterLink>
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
        v-for="(page, index) in totalPages"
        :key="index"
        :class="{ active: currentPage === page }"
        @click="setPage(page)"
      >
        <a href="#" class="page-link text-primary-emphasis">{{ page }}</a>
      </li>
      <!-- <li class="page-item"><a class="page-link text-primary-emphasis" href="#">2</a></li>
      <li class="page-item"><a class="page-link text-primary-emphasis" href="#">3</a></li> -->
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
</template>

<script>
export default {
  data() {
    return {
      i: 0,
      orderData: [],
      currentPage: 1, // 當前頁碼
      itemsPerPage: 10, // 每頁顯示的資料數量
      identity: [
        {
          value: 1,
          name: '一般會員'
        },
        {
          value: 2,
          name: '批發商'
        }
      ],
      content: '',
      searchData: []
    }
  },
  methods: {
    fetchOrderData(event) {
      const selectValue = event ? event.target.value : 0
      fetch(`${import.meta.env.VITE_API_URL}/orderManage/orderManage.php?identity=${selectValue}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.order == null) {
            alert(data.msg)
          } else {
            this.orderData = data.order
            this.searchData = data.order
            // console.log(this.orderData)
            localStorage.setItem('orderData', JSON.stringify(this.orderData))
          }
        })
    },
    getCartStatus(status) {
      const statusMap = {
        0: '未處理',
        1: '處理中',
        2: '已備貨',
        3: '已取件',
        4: '請求取消',
        5: '已取消'
      }
      return statusMap[status] || '未知狀態'
    },
    searchList() {
      if (this.content == '') {
        return (this.searchData = this.orderData)
      }
      this.searchData = this.orderData.filter((data) => {
        return (
          data.cart_id == this.content ||
          data.cart_name.includes(this.content) ||
          data.phone.includes(this.content) ||
          data.email.includes(this.content)
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
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.orderData.length / this.itemsPerPage)
    },
    paginatedQuiz() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.searchData.slice(startIndex, startIndex + this.itemsPerPage)
    }
  },
  mounted() {
    this.fetchOrderData()
  }
}
</script>
