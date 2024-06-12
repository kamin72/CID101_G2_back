<template>
  <div class="container">
    <span class="fs-1">管理員管理</span>
    <div class="d-flex gap-3 justify-content-end" style="width: 100%">
      <div class="input-group" style="width: 30%">
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with two button addons"
        />
        <button class="btn btn-outline-primary" type="button">搜尋</button>
      </div>
      <button type="button" class="btn btn-primary" style="width: 10%">新增</button>
    </div>
    <div class="text-center bg-dark mt-5 text-light" style="height: 50px">
      <div class="row align-items-center">
        <div class="col">管理員編號</div>
        <div class="col">姓名</div>
        <div class="col">帳號</div>
        <div class="col">權限等級</div>
        <div class="col">狀態</div>
        <div class="col">操作</div>
      </div>
    </div>
  </div>
</template>
