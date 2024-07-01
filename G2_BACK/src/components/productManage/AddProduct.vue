<template>
  <div class="container">
    <div class="row py-5">
      <h1>新增商品</h1>
      <form>
      <div class="mb-3">
        <label for="name" class="form-label fw-bolder">商品名稱</label>
        <input type="text" class="form-control" id="name" />
      </div>
      <div class="mb-3">
        <label for="ename" class="form-label fw-bolder">商品名稱(英文)</label>
        <input type="text" class="form-control" id="ename" />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label fw-bolder">類別</label>
        <input type="text" class="form-control" id="category" />
      </div>
      <div class="mb-3">
        <label for="variety" class="form-label fw-bolder">葡萄品種</label>
        <input type="text" class="form-control" id="variety" />
      </div>
      <div class="mb-3">
        <label for="year" class="form-label fw-bolder">年份</label>
        <input type="text" class="form-control" id="year" />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label fw-bolder">價格</label>
        <input type="text" class="form-control" id="price" />
      </div>
      <div class="mb-3">
        <label for="describe" class="form-label fw-bolder">商品描述</label>
        <textarea class="form-control" id="describe" rows="4"></textarea>
      </div>
      <div class="mb-3">
        <label for="productImg" class="form-label fw-bolder">商品圖片</label>
        <button type="button" class="btn btn-primary">上傳商品圖片</button>
      </div>
      <div class="mb-3">
        <label for="backgroundImg" class="form-label fw-bolder">背景圖片</label>
        <button type="button" class="btn btn-primary">上傳背景圖片</button>
      </div>
      <div class="d-flex justify-content-center">
          <RouterLink to="/ProductManage">
            <button type="button" class="btn btn-secondary me-2">取消</button>
          </RouterLink>
          <RouterLink to="/ProductManage">
            <button type="submit" class="btn btn-primary">提交</button>
          </RouterLink>
      </div>
    </form>
   </div>
  </div>
</template>
  