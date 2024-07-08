<template>
  <div class="container">
    <span class="fs-1 fw-bolder">商品管理</span>

    <div class="d-flex justify-content-end py-4">
      <div style="width: 320px" class="input-group mb-3">
        <input
          style="height: 40px"
          type="text"
          class="form-control"
          v-model="search"
          placeholder="請輸入商品資訊"
          aria-label="search-course-info"
          aria-describedby="button-search"
        />
        <button class="btn btn-primary me-1" type="button" id="button-search">搜尋</button>
      </div>
      <RouterLink to="/addProduct">
        <button type="button" class="btn btn-primary" style="height: 40px">新增</button>
      </RouterLink>
    </div>

    <table class="table align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">商品編號</th>
          <th scope="col">商品圖片</th>
          <th scope="col">商品名稱</th>
          <th scope="col">葡萄品種</th>
          <th scope="col">售價</th>
          <th scope="col">狀態</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayList" :key="item.prod_id">
          <td scope="row">{{ item?.prod_id }}</td>
          <td>
            <img
              :src="parseServerImg(item?.prod_img)"
              class="rounded d-block"
              alt="..."
              style="max-width: 100px; max-height: 100px"
            />
          </td>
          <!-- <td><img :src="parseServerImg(item?.prod_img)" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td> -->
          <td>{{ item?.prod_name }}</td>
          <td>{{ item?.prod_variety }}</td>
          <td>NT$ {{ item?.prod_price }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <td>
            <div class="button-wrap d-flex">
              <RouterLink :to="'/editProduct/' + item?.prod_id">
                <button type="button" class="btn btn-primary d-flex align-items-center me-1">
                  編輯
                </button>
              </RouterLink>
              <button type="button" class="btn btn-secondary d-flex align-items-center" @click="deleteProduct(item.prod_id)">
                刪除
              </button>
            </div>
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
      products: [],
      search: ''
    }
  },
  computed: {
    displayList() {
      if (this.search === '') return this.products
      return this.products.filter((item) => {
        // 請寫出符合條件邏輯
        const name = item.prod_name
        const variety = item.prod_variety
        return name.includes(this.search) || variety.includes(this.search)
      })
    }
  },
  methods: {

    parseServerImg(file) {
      // return `${import.meta.env.VITE_FILE_URL}/${file}`
      return new URL(`../assets/img/wine/${file}`, import.meta.url).href
    },
    fetchData() {
      fetch('http://localhost/CID101_G2_php/front/product.php')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data) // 添加這行來檢查接收到的數據
          this.products = data.products
          console.log('Fetched data:', this.products) // 添加這行來檢查接收到的數據
        })
    },

    async deleteProduct(productId) {
      //使用 confirm() 彈出一個確認對話框。如果用戶點擊"取消"，函數將立即返回，不執行刪除操作。
      if(!confirm('確定要刪除這個商品嗎?')) {
        return;
      }

      try {
        // 發送刪除請求
        // 使用 fetch API 發送GET請求到刪除API。URL中包含要刪除的商品ID。
        const response = await fetch(`http://localhost/CID101_G2_php/back/productManage/product_delete.php?prod_id=${productId}`);
        const result = await response.json();

        if(!result.error) {
          // 排除已刪除的商品
          this.products = this.products.filter(product => product.prod_id !== productId);

        } else {
          alert('刪除失敗:' + result.msg);
         }

        } catch (error) {
          console.error('Error', error);
          alert('發生錯誤，請稍後再試');
        }
      }
    },
  mounted() {
    this.fetchData()
  },

  // 添加這個生命週期鉤子
  activated() {
    this.fetchData(); // 每次組件被激活時重新獲取數據
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchData();
    })
  },
 watch: {
  $route(to, from) {
    if(to.name === 'ProductManage') {
      this.fetchData();
    }
  }
 }
}
</script>
