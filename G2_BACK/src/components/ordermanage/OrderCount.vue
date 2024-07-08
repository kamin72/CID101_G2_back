<template>
  <div class="d-flex justify-content-start">
    <div class="mt-3 me-5 w-25">
      <label for="access" class="form-label fw-bolder">類別</label>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="selectedCategory"
        @change="getAllOrderitems"
      >
        <option value="0" selected>類別</option>
        <option value="紅酒">紅酒</option>
        <option value="白酒">白酒</option>
      </select>
    </div>
    <div class="mt-3 w-25">
      <label for="access" class="form-label fw-bolder">品種</label>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="selectedVariety"
        @change="getAllOrderitems"
      >
        <option value="0" selected>品種</option>
        <option value="波爾多混釀">波爾多混釀</option>
        <option value="阿里戈蝶">阿里戈蝶</option>
      </select>
    </div>
    <!-- <div class="mt-3 w-50">
      <label for="access" class="form-label fw-bolder">商品名稱</label>
      <select class="form-select" aria-label="Default select example" @change="getAllOrderitems">
        <option value="0" selected>商品名稱</option>
        <option value="批發商">批發商</option>
        <option value="一般會員">一般會員</option>
      </select>
    </div> -->
  </div>
  <div class="d-flex justify-content-start mt-4">
    <div class="input-group z-0 w-auto h-25 align-self-end">
      <input
        type="date"
        class="form-control"
        placeholder=""
        aria-label="Example text with two button addons"
        v-model="date1"
      />
      <span class="ms-3 me-3">~</span>
      <input
        type="date"
        class="form-control"
        placeholder=""
        aria-label="Example text with two button addons"
        v-model="date2"
      />
      <button class="btn btn-outline-primary" type="button" @click="filterByDate">搜尋</button>
    </div>
    <div class="mt-3 ms-5 w-25">
      <label for="access" class="form-label fw-bolder">來源</label>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="selectedIdentity"
        @change="getAllOrderitems"
      >
        <option value="0" selected>來源</option>
        <option value="2">批發商</option>
        <option value="1">一般會員</option>
      </select>
    </div>
  </div>

  <table class="table mt-5">
    <thead>
      <tr class="table-dark">
        <th scope="col">類別</th>
        <th scope="col">品種</th>
        <th scope="col">商品名稱</th>
        <th scope="col">來源</th>
        <th scope="col">數量</th>
        <th scope="col">金額</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in paginatedQuiz" :key="index">
        <td scope="row">{{ item.prod_category }}</td>
        <td>{{ item.prod_variety }}</td>
        <td>{{ item.prod_name }}</td>
        <td>{{ switchIdentity(item.identity) }}</td>
        <td>{{ item.amount }}</td>
        <td>$ {{ total(index) }}</td>
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
          :disabled="currentPage === 0"
          style="cursor: pointer"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        @click="setPage(page)"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link text-primary-emphasis" href="#">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link text-primary-emphasis"
          aria-label="Next"
          @click="nextPage"
          :disabled="currentPage === totalPages"
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
      currentPage: 1, // 當前頁碼
      itemsPerPage: 10, // 每頁顯示的資料數量
      AllOrderItem: [],
      filterData: [],
      items: {
        category: {
          1: '紅酒',
          2: '白酒'
        },
        variety: {
          1: '波爾多混釀',
          2: '黑皮諾',
          3: '帕洛米諾',
          4: '阿里戈蝶',
          5: '夏多內'
        },
        identity: {
          1: '一般會員',
          2: '批發商'
        }
      },
      selectedCategory: '0',
      selectedVariety: '0',
      selectedIdentity: '0',
      date1: '',
      date2: ''
    }
  },
  methods: {
    getAllOrderitems() {
      const params = {
        category: this.selectedCategory,
        variety: this.selectedVariety,
        identity: this.selectedIdentity
      }
      fetch(`http://localhost/CID101_G2_php/back/orderManage/getAllOrderitem.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else {
            this.AllOrderItem = data.orderItemAll
            this.filterData = data.orderItemAll
            // console.log(this.AllOrderItem)
          }
        })
    },
    total(index) {
      return this.AllOrderItem[index]?.price * this.AllOrderItem[index]?.amount
    },
    switchIdentity(index) {
      const identity = {
        1: '一般會員',
        2: '批發商'
      }
      return identity[index]
    },
    filterByDate() {
      if (this.date1 == '' && this.date2 == '') {
        this.filterData = this.AllOrderItem
        return
      }

      this.filterData = this.AllOrderItem.filter((data) => {
        return data.build_date >= this.date1 && data.build_date <= this.date2
      })
      // console.log(this.filterData)
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
      return Math.ceil(this.AllOrderItem.length / this.itemsPerPage)
    },
    paginatedQuiz() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filterData.slice(startIndex, startIndex + this.itemsPerPage)
    }
  },
  mounted() {
    this.getAllOrderitems()
  }
}
</script>
