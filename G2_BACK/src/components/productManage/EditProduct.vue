<template>
  <!-- 
1.當您在 EditProduct 頁面修改數據並點擊保存按鈕時，數據會被發送到後端進行更新。
2.更新成功後，頁面會自動跳轉到 ProductManage 頁面。
3.當 ProductManage 頁面被重新激活時，它會自動重新獲取最新的商品數據。
4.這樣，ProductManage 的商品列表就會顯示最新的的數據。
 -->

  <div class="container">
    <div class="row py-5">
      <h1 class="fs-1 fw-bolder">編輯商品</h1>
      <div class="mb-3">
        <label for="name" class="form-label fw-bolder">商品名稱</label>
        <input type="text" class="form-control" id="name" v-model="detail.prod_name" />
      </div>
      <div class="mb-3">
        <label for="ename" class="form-label fw-bolder">商品名稱(英文)</label>
        <input type="text" class="form-control" id="ename" v-model="detail.prod_ename" />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label fw-bolder">類別</label>
        <input type="text" class="form-control" id="category" v-model="detail.prod_category" />
      </div>
      <div class="mb-3">
        <label for="variety" class="form-label fw-bolder">葡萄品種</label>
        <input type="text" class="form-control" id="variety" v-model="detail.prod_variety" />
      </div>
      <div class="mb-3">
        <label for="year" class="form-label fw-bolder">年份</label>
        <input type="text" class="form-control" id="year" v-model="detail.prod_year" />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label fw-bolder">價格</label>
        <input type="text" class="form-control" id="price" v-model="detail.prod_price" />
      </div>
      <div class="mb-3">
        <label for="describe" class="form-label fw-bolder">商品描述</label>
        <textarea
          class="form-control"
          id="describe"
          rows="4"
          v-model="detail.prod_describe"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="productImg" class="form-label fw-bolder">商品圖片</label>
        <input 
          type="file" 
          class="form-control" 
          id="productImg" 
          @change="handleProductImgChange" 
        />

        <img
          v-if="productImgPreview || productImg"
          :src="productImgPreview || productImg"
          class="mt-2"
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="backgroundImg" class="form-label fw-bolder">背景圖片</label>
        <input
          type="file"
          class="form-control"
          id="backgroundImg"
          @change="handleBackgroundImgChange"
        />

        <img
          v-if="backgroundImgPreview || backgroundImg"
          :src="backgroundImgPreview || backgroundImg"
          class="mt-2"
          style="max-width: 200px"
        />

        <div class="d-flex justify-content-center" style="gap: 4rem; padding: 30px 0">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            style="width: 150px"
            @click.prevent="saveProduct"
          >
            儲存
          </button>
          <RouterLink to="/ProductManage">
            <button type="button" class="btn btn-secondary btn-lg me-2" style="width: 150px">
              取消
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      products: [],
      detail: {},
      productImgPreview: null,
      backgroundImgPreview: null
    }
  },
  computed: {
    productImg() {
      return this.detail.prod_img ? this.parseServerImg(this.detail.prod_img) : null
    },
    backgroundImg() {
      return this.detail.bg_img ? this.parseServerImg(this.detail.bg_img) : null
    }
  },
  watch: {
    '$route.params.id'() {
      const productId = this.$route.params.id // 從路由參數中獲取產品 ID
      this.detail = this.products.find((product) => product.prod_id === Number(productId)) // 根據 ID 找到對應的產品詳情
    }
  },
  methods: {
    async saveProduct() {
      try {
        let formData = new FormData()
        formData.append('prod_id', this.detail.prod_id)
        formData.append('prod_name', this.detail.prod_name)
        formData.append('prod_ename', this.detail.prod_ename)
        formData.append('prod_category', this.detail.prod_category)
        formData.append('prod_variety', this.detail.prod_variety)
        formData.append('prod_year', this.detail.prod_year)
        formData.append('prod_price', this.detail.prod_price)
        formData.append('prod_describe', this.detail.prod_describe)

        // 如果有新的圖片上傳，添加到 formData
        if (this.detail.prod_img instanceof Blob) {
          formData.append('prod_img', this.detail.prod_img)
        } else {
          formData.append('prod_img', this.detail.prod_img); // 保留原始圖片
        }

        if (this.detail.bg_img instanceof Blob) {
          formData.append('bg_img', this.detail.bg_img)
        } else {
          formData.append('bg_img', this.detail.bg_img); // 保留原始圖片
        }

        const response = await fetch('http://localhost/CID101_G2_php/back/productManage/product_update.php', {
          body: formData,
          method: 'POST'
        })

        const result = await response.json()
        if (!result.error) {
          // 更新成功
          alert('商品更新成功') 
          this.$router.push('/productManage')
        } else {
          // 更新失敗
          alert('更新失敗:' + result.msg)
        }
      } catch (error) {
        // console.error('Error:', error)
        // alert('發生錯誤，請稍後再試')
      }
    },

    parseServerImg(file) {
      // return `${import.meta.env.VITE_FILE_URL}/${file}`
      return new URL(`../../assets/img/wine/${file}`, import.meta.url).href
    },
    fetchData() {
      fetch('http://localhost/CID101_G2_php/front/product.php')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data) // 添加這行來檢查接收到的數據
          this.products = data.products
          console.log('Fetched data:', this.products) // 添加這行來檢查接收到的數據
          this.detail = this.products.find(
            (product) => product.prod_id === Number(this.$route.params.id)
          ) // 根據 ID 找到對應的產品詳情
        })
    },

    handleProductImgChange(event) {
      this.detail.prod_img = event.target.files[0]
      if (this.detail.prod_img) {
        this.productImgPreview = URL.createObjectURL(this.detail.prod_img)
      }
    },
    handleBackgroundImgChange(event) {
      this.detail.bg_img = event.target.files[0]
      if (this.detail.bg_img) {
        this.backgroundImgPreview = URL.createObjectURL(this.detail.bg_img)
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
