<template>
  <div class="container">
    <p class="fs-1 fw-bolder">詳情資訊</p>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">建立日期</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="staticEmail"
          value="2022-02-02"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">修改日期</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly class="form-control-plaintext" id="staticEmail" value="2022-02-02"/>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">會員編號</label>
      <div class="col-sm-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="001" />
      </div>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label fw-bolder">姓名</label>
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="王陽明" />
    </div>
    <div class="mb-3">
      <label for="account" class="form-label fw-bolder">帳號</label>
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="aaaaaa" />
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label fw-bolder">電話</label>
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="0900000000" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label fw-bolder">E-mail</label>
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email" />
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">狀態</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>選擇帳號是否啟用</option>
        <option value="1">啟用</option>
        <option value="2">停用</option>
      </select>
    </div>
    <div class="mt-5 mb-5 d-flex gap-5" style="width: 100%">
      <button type="button" class="btn btn-primary p-3 fs-4" style="width: 50%">儲存</button>
      <button type="button" class="btn btn-secondary fs-4" style="width: 50%">取消</button>
    </div>
  </div>
</template>
