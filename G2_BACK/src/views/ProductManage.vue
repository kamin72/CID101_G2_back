<template>
    <div class="container">
      <span class="fs-1 fw-bolder">商品管理</span>
      <div class="d-flex gap-3 justify-content-end">
        <div class="input-group z-0 col-6 w-auto">
          <input type="text" class="form-control"
            placeholder="請輸入商品資訊"
            aria-label="Example text with two button addons"
          />
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
          <tr>
            <td scope="row" class="align-middle">01</td>
             <td><img src="../assets/img/wine/Elegant-Red-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">典雅馥紅酒 2014</td>
            <td class="align-middle">波爾多混釀</td>
            <td class="align-middle">NT$ 7,500</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">02</td>
             <td><img src="../assets/img/wine/Elegant-Red-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">典雅馥紅酒 2013</td>
            <td class="align-middle">波爾多混釀</td>
            <td class="align-middle">NT$ 7,600</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">03</td>
             <td><img src="../assets/img/wine/Elegant-Red-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">典雅馥紅酒 2012</td>
            <td class="align-middle">波爾多混釀</td>
            <td class="align-middle">NT$ 8,000</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">04</td>
             <td><img src="../assets/img/wine/Elegant-Red-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">典雅馥紅酒 2009</td>
            <td class="align-middle">波爾多混釀</td>
            <td class="align-middle">NT$ 8,200</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">05</td>
             <td><img src="../assets/img/wine/Pearl-White-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">珍珠白酒 2020</td>
            <td class="align-middle">波爾多混釀</td>
            <td class="align-middle">NT$ 2,920</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">06</td>
             <td><img src="../assets/img/wine/Pearl-White-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">珍珠白酒 2019</td>
            <td class="align-middle">波爾多混釀</td>
            <td class="align-middle">NT$ 3,600</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">07</td>
             <td><img src="../assets/img/wine/Pearl-White-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">水晶白酒 2018</td>
            <td class="align-middle">阿里戈蝶</td>
            <td class="align-middle">NT$ 1,000</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </td>
            <td class="align-middle">
              <RouterLink to="/editProduct">
                <button type="button" class="btn btn-primary">編輯</button>
              </RouterLink>
            </td>
          </tr>
          <tr>
            <td scope="row" class="align-middle">08</td>
             <td><img src="../assets/img/wine/Pearl-White-Wine.png" class="rounded mx-auto d-block" alt="..." style="max-width: 100px; max-height: 100px;"></td>
            <td class="align-middle">水晶白酒 2017</td>
            <td class="align-middle">阿里戈蝶</td>
            <td class="align-middle">NT$ 1,100</td>
            <td class="align-middle">
              <div class="form-check form-switch col d-flex justify-content-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
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
  