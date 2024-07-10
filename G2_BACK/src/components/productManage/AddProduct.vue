<template>
  <div class="container">
    <div class="row py-5">
      <h1 class="fs-1 fw-bolder">新增商品</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="id" class="form-label fw-bolder">商品編號</label>
          <input type="text" class="form-control" id="id" v-model="formData.prod_id" />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label fw-bolder">商品名稱</label>
          <input type="text" class="form-control" id="name" v-model="formData.prod_name" />
        </div>
        <div class="mb-3">
          <label for="ename" class="form-label fw-bolder">商品名稱(英文)</label>
          <input type="text" class="form-control" id="ename" v-model="formData.prod_ename" />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label fw-bolder">類別</label>
          <input type="text" class="form-control" id="category" v-model="formData.prod_category" />
        </div>
        <div class="mb-3">
          <label for="variety" class="form-label fw-bolder">葡萄品種</label>
          <input type="text" class="form-control" id="variety" v-model="formData.prod_variety" />
        </div>
        <div class="mb-3">
          <label for="year" class="form-label fw-bolder">年份</label>
          <input type="text" class="form-control" id="year" v-model="formData.prod_year" />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label fw-bolder">價格</label>
          <input type="text" class="form-control" id="price" v-model="formData.prod_price" />
        </div>
        <div class="mb-3">
          <label for="describe" class="form-label fw-bolder">商品描述</label>
          <textarea
            class="form-control"
            id="describe"
            rows="4"
            v-model="formData.prod_describe"
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
            v-if="productImgPreview"
            :src="productImgPreview"
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
            v-if="backgroundImgPreview"
            :src="backgroundImgPreview"
            class="mt-2"
            style="max-width: 200px"
          />
        </div>

        <div class="d-flex justify-content-center" style="gap: 4rem; padding: 30px 0">
          <RouterLink to="/ProductManage">
            <button type="button" class="btn btn-secondary btn-lg me-2" style="width: 150px">
              取消
            </button>
          </RouterLink>
          <button type="submit" class="btn btn-primary btn-lg" style="width: 150px">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        prod_id: '',
        prod_name: '',
        prod_ename: '',
        prod_category: '',
        prod_variety: '',
        prod_year: '',
        prod_price: '',
        prod_describe: '',
        prod_img: '',
        bg_img: ''
      },
      productImgPreview: null,
      backgroundImgPreview: null
    }
  },
  methods: {
    async submitForm() {
      try {
        let formData = new FormData()
        formData.append('prod_id', this.formData.prod_id)
        formData.append('prod_name', this.formData.prod_name)
        formData.append('prod_ename', this.formData.prod_ename)
        formData.append('prod_category', this.formData.prod_category)
        formData.append('prod_variety', this.formData.prod_variety)
        formData.append('prod_year', this.formData.prod_year)
        formData.append('prod_price', this.formData.prod_price)
        formData.append('prod_describe', this.formData.prod_describe)

        // 如果有新的圖片上傳，添加到 formData
        if (this.formData.prod_img instanceof Blob) {
          formData.append('prod_img', this.formData.prod_img)
        }
        if (this.formData.bg_img instanceof Blob) {
          formData.append('bg_img', this.formData.bg_img)
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/productManage/product_add.php`, {
          body: formData,
          method: 'POST'
        })

        const result = await response.json()
        if (!result.error) {
          alert('商品新增成功')
          this.$router.push('/ProductManage')
        } else {
          alert('商品新增失敗 :' + result.msg)
        }
      } catch (error) {
        // console.error('Error:', error)
        // alert('發生錯誤，請稍後再試')
      }
    },
    handleProductImgChange(event) {
      this.formData.prod_img = event.target.files[0]
      if (this.formData.prod_img) {
        this.productImgPreview = URL.createObjectURL(this.formData.prod_img)
      }
    },
    handleBackgroundImgChange(event) {
      this.formData.bg_img = event.target.files[0]
      if (this.formData.bg_img) {
        this.backgroundImgPreview = URL.createObjectURL(this.formData.bg_img)
      }
    }
  }
}
</script>
