<template>
  <div class="container">
    <span class="fs-1 fw-bolder">商品管理</span>
    <div class="d-flex gap-3 justify-content-end">
      <div class="input-group z-0 col-6 w-auto">
        <input type="text" class="form-control" placeholder="請輸入商品資訊"
          aria-label="Example text with two button addons" />
        <button class="btn btn-outline-primary" type="button">搜尋</button>
      </div>
      <RouterLink to="/addProduct">
        <button type="button" class="btn btn-primary">新增</button>
      </RouterLink>
    </div>

    <table class="table mt-5 text-center">
      <thead class="table-dark">
        <tr>
          <th scope="col">編號</th>
          <th scope="col">商品圖片</th>
          <th scope="col">商品名稱</th>
          <th scope="col">葡萄品種</th>
          <th scope="col">售價</th>
          <th scope="col">狀態</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products['products']" :key="product.prod_id">
          <td scope="row" class="align-middle">{{ product?.prod_id }}</td>
          <td><img src="../assets/img/wine/Elegant-Red-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
          <!-- <td><img :src="parseServerImg(product?.prod_img)" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td> -->
          <td class="align-middle">{{ product?.prod_name }}</td> 
          <td class="align-middle">{{ product?.prod_variety }}</td>
          <td class="align-middle">NT$ {{ product?.prod_price }}</td>
          <td class="align-middle">
            <div class="form-check form-switch col d-flex justify-content-center">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            </div>
          </td>
          <td class="align-middle">
            <RouterLink to="/editProduct">
              <button type="button" class="btn btn-primary">編輯</button>
            </RouterLink>
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
      //商品資訊
      products: []
    }
  },
  // computed: {
  // },
  methods: {
    parseServerImg(file) {
      return `${import.meta.env.VITE_FILE_URL}/${file}`
    },
    fetchData() {
      fetch('http://localhost/CID101_G2_php/front/product.php')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // 添加這行來檢查接收到的數據
          this.products = data;
        })
    },
  },
  mounted() {
    console.log('Component mounted');
    this.fetchData();
   },
   created() {
    // 初始化資料
    // this.fetchData();
   },
}

</script>



