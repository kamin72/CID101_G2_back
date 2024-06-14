<template>
    <div style="width: 100%;" class="container">
        <div class="row py-5">
            <h1>課程管理</h1>
            <div class="button-wrap d-flex justify-content-between py-4">
                <div class="left-wrap d-flex justify-content-between">
                    <button type="button" class="btn btn-primary me-1" style="height: 40px;">課程內容管理</button>
                    <button type="button" class="btn btn-secondary" style="height: 40px;">課程訂單管理</button>
                </div>
                <div class="right-wrap d-flex">
                    <div style="width: 320px;" class="input-group mb-3">
                        <input style="height: 40px;" type="text" class="form-control" placeholder="請輸入課程內容資訊"
                            aria-label="search-course-info" aria-describedby="button-search" />
                        <button class="btn btn-primary me-1" type="button" id="button-search">搜尋</button>
                    </div>
                    <button type="button" class="btn btn-primary" style="height: 40px;">新增</button>
                </div>
            </div>
            <table class="table align-middle">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">課程編號</th>
                        <th scope="col">課程名稱</th>
                        <th scope="col">老師</th>
                        <th scope="col">上課時間</th>
                        <th scope="col">上課教室</th>
                        <th scope="col">課程價格</th>
                        <th scope="col">上架狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 資料四 -->
                    <tr>
                        <th scope="row">4</th>
                        <td>品酒初級課程2</td>
                        <td>王大明</td>
                        <td>2024/05/10 14:00-<br>2024/05/10 16:00</td>
                        <th>A</th>
                        <td>NT. 3400</td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    id="flexSwitchCheckChecked" checked>
                            </div>
                        </td>
                        <td>
                            <div class="button-wrap d-flex">
                                <button type="button" class="btn btn-primary d-flex align-items-center me-1"
                                    style="height: 40px;">編輯</button>
                                <button type="button" class="btn btn-secondary d-flex align-items-center"
                                    style="height: 40px;">刪除</button>
                            </div>
                        </td>
                    </tr>
                    <!-- 資料三 -->
                    <tr>
                        <th scope="row">3</th>
                        <td>品酒進階課程1</td>
                        <td>王大明</td>
                        <td>2024/05/09 14:00-<br>2024/05/09 16:00</td>
                        <th>A</th>
                        <td>NT. 4200</td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    id="flexSwitchCheckChecked" checked>
                            </div>
                        </td>
                        <td>
                            <div class="button-wrap d-flex">
                                <button type="button" class="btn btn-primary d-flex align-items-center me-1"
                                    style="height: 40px;">編輯</button>
                                <button type="button" class="btn btn-secondary d-flex align-items-center"
                                    style="height: 40px;">刪除</button>
                            </div>
                        </td>
                    </tr>
                    <!-- 資料二 -->
                    <tr>
                        <th scope="row">2</th>
                        <td>品酒中級課程1</td>
                        <td>王大明</td>
                        <td>2024/05/02 14:00-<br>2024/05/02 16:00</td>
                        <th>A</th>
                        <td>NT. 3800</td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    id="flexSwitchCheckChecked" checked>
                            </div>
                        </td>
                        <td>
                            <div class="button-wrap d-flex">
                                <button type="button" class="btn btn-primary d-flex align-items-center me-1"
                                    style="height: 40px;">編輯</button>
                                <button type="button" class="btn btn-secondary d-flex align-items-center"
                                    style="height: 40px;">刪除</button>
                            </div>
                        </td>
                    </tr>
                    <!-- 資料一 -->
                    <tr>
                        <th scope="row">1</th>
                        <td>品酒初級課程1</td>
                        <td>王大明</td>
                        <td>2024/05/01 14:00-<br>2024/05/02 16:00</td>
                        <th>A</th>
                        <td>NT. 3200</td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    id="flexSwitchCheckChecked" checked>
                            </div>
                        </td>
                        <td>
                            <div class="button-wrap d-flex">
                                <button type="button" class="btn btn-primary d-flex align-items-center me-1"
                                    style="height: 40px;">編輯</button>
                                <button type="button" class="btn btn-secondary d-flex align-items-center"
                                    style="height: 40px;">刪除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
