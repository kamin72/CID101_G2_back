<template>
  <div class="container">
    <p class="fs-1 fw-bolder">編輯</p>
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
          readonly
          class="form-control-plaintext"
          id="staticEmail"
          value="2022-02-02"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">編號</label>
      <div class="col-sm-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="001" />
      </div>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label fw-bolder">姓名</label>
      <input type="text" class="form-control" id="name" />
    </div>
    <div class="mb-3">
      <label for="account" class="form-label fw-bolder">帳號</label>
      <input type="text" class="form-control" id="account" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label fw-bolder">密碼</label>
      <input type="text" class="form-control" id="password" />
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">權限</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>選擇權限</option>
        <option value="1">超級管理員</option>
        <option value="2">一般管理員</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="access" class="form-label fw-bolder">狀態</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>選擇帳號狀態</option>
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
