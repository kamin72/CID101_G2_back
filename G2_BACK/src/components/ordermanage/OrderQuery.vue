<template>
  <div class="d-flex justify-content-between">
    <div class="mt-3 w-50">
      <label for="access" class="form-label fw-bolder">來源</label>
      <select
        class="form-select"
        aria-label="Default select example"
        @change="fetchPageData($event)"
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
      <tr v-for="(item, index) in searchData" :key="index">
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
          href="#"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="(i, index) in totalPages" :key="index">
        <a class="page-link text-primary-emphasis">{{ i }}</a>
      </li>
      <!-- <li class="page-item"><a class="page-link text-primary-emphasis" href="#">2</a></li>
      <li class="page-item"><a class="page-link text-primary-emphasis" href="#">3</a></li> -->
      <li class="page-item">
        <a
          class="page-link text-primary-emphasis"
          aria-label="Next"
          href="#"
          @click="nextPage"
          :disabled="currentPage === totalPages"
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
      items: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
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
      searchData: null
    }
  },
  methods: {
    // fetchOrderData(event) {
    //   const selectValue = event ? event.target.value : 0
    //   fetch(
    //     `http://localhost/CID101_G2_php/back/orderManage/orderManage.php?identity=${selectValue}`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.error) {
    //         alert(data.msg)
    //       } else if (data.order == null) {
    //         alert(data.msg)
    //       } else {
    //         this.orderData = data.order
    //         this.searchData = data.order
    //         // console.log(this.orderData)
    //         localStorage.setItem('orderData', JSON.stringify(this.orderData))
    //       }
    //     })
    // },
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
        return (this.searchData = this.items)
      }
      this.searchData = this.items.filter((data) => {
        return (
          data.cart_id == this.content ||
          data.cart_name.includes(this.content) ||
          data.phone.includes(this.content) ||
          data.email.includes(this.content)
        )
      })
    },
    fetchPageData(event) {
      const selectValue = event ? event.target.value : 0

      fetch(
        `http://localhost/CID101_G2_php/back/orderManage/page.php?page=${this.currentPage}&itemsPerPage=${this.itemsPerPage}&identity=${selectValue}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.searchData = data.items
          this.items = data.items
          this.totalItems = data.totalItems
          this.currentPage = data.currentPage
          // console.log(this.currentPage)
          // console.log(this.items)
        })
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchPageData()
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchPageData()
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    }
  },
  mounted() {
    // this.fetchOrderData()
    this.fetchPageData()
  }
}
</script>
