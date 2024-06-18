<template>
  <div class="d-flex justify-content-between">
    <div class="mt-3 w-50">
      <label for="access" class="form-label fw-bolder">來源</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>來源</option>
        <option value="批發商">批發商</option>
        <option value="一般會員">一般會員</option>
      </select>
    </div>
    <div class="input-group z-0 w-auto h-25 align-self-end">
      <input
        type="text"
        class="form-control"
        placeholder=""
        aria-label="Example text with two button addons"
      />
      <button class="btn btn-outline-primary" type="button">搜尋</button>
    </div>
  </div>
  <table class="table mt-5">
    <thead>
      <tr>
        <th scope="col">詢價單編號</th>
        <th scope="col">姓名</th>
        <th scope="col">連絡電話</th>
        <th scope="col">EMAIL</th>
        <th scope="col">狀態</th>
        <th scope="col" style="text-align: center">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>王大明</td>
        <td>0912345678</td>
        <td>123@email.com</td>
        <td>未處理</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink to="/">
            <button type="button" class="btn btn-primary">編輯</button>
          </RouterLink>
        </td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>王大明</td>
        <td>0912345678</td>
        <td>123@email.com</td>
        <td>處理中</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink to="/">
            <button type="button" class="btn btn-primary">編輯</button>
          </RouterLink>
        </td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>王大明</td>
        <td>0912345678</td>
        <td>123@email.com</td>
        <td>已備貨</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink to="/">
            <button type="button" class="btn btn-primary">編輯</button>
          </RouterLink>
        </td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>王大明</td>
        <td>0912345678</td>
        <td>123@email.com</td>
        <td>已取件</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink to="/">
            <button type="button" class="btn btn-primary">編輯</button>
          </RouterLink>
        </td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>王大明</td>
        <td>0912345678</td>
        <td>123@email.com</td>
        <td>請求取消</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink to="/">
            <button type="button" class="btn btn-primary">編輯</button>
          </RouterLink>
        </td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>王大明</td>
        <td>0912345678</td>
        <td>123@email.com</td>
        <td>已取消</td>
        <td class="d-flex gap-2 justify-content-center">
          <RouterLink to="/">
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
</template>
