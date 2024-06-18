<template>
    <div class="container">
      <p class="fs-1 fw-bolder">新增</p>
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
        <button type="button" class="btn btn-primary btn-lg">上傳商品圖片</button>
      </div>
      <div class="mb-3">
        <label for="backgroundImg" class="form-label fw-bolder">背景圖片</label>
        <button type="button" class="btn btn-primary btn-lg">上傳背景圖片</button>
      </div>
      <div class="mt-5 d-flex gap-5" style="width: 100%">
        <button type="button" class="btn btn-primary p-3 fs-4" style="width: 50%">新增</button>
        <button type="button" class="btn btn-secondary fs-4" style="width: 50%">取消</button>
      </div>
    </div>
  </template>
  