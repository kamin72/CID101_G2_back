<template>
  <div class="container">
    <span class="fs-1 fw-bolder">管理員管理</span>
    <div class="d-flex gap-3 justify-content-end">
      <div class="input-group z-0 col-6 w-auto">
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with two button addons"
        />
        <button class="btn btn-outline-primary" type="button">搜尋</button>
      </div>
      <RouterLink to="/addNew">
        <button type="button" class="btn btn-primary">新增</button>
      </RouterLink>
    </div>

    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">管理員編號</th>
          <th scope="col">姓名</th>
          <th scope="col">帳號</th>
          <th scope="col">權限等級</th>
          <th scope="col">狀態</th>
          <th scope="col" style="text-align: center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>PeiPei</td>
          <td>mgr.01</td>
          <td>超級管理員</td>
          <td>
            <div class="form-check form-switch col">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <td class="d-flex gap-2 justify-content-center">
            <RouterLink to="/editMember">
              <button type="button" class="btn btn-primary">編輯</button>
            </RouterLink>
            <button type="button" class="btn btn-secondary">刪除</button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>PeiPei</td>
          <td>mgr.01</td>
          <td>超級管理員</td>
          <td>
            <div class="form-check form-switch col">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <td class="d-flex gap-2 justify-content-center">
            <button type="button" class="btn btn-primary">編輯</button>
            <button type="button" class="btn btn-secondary">刪除</button>
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
