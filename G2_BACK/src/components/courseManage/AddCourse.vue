<template>
  <div class="container">
    <p class="fs-1 fw-bolder">新增課程</p>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#" class="text-reset text-decoration-none">課程管理</a></li>
        <li class="breadcrumb-item"><a href="#" class="text-reset text-decoration-none">課程內容管理</a></li>
        <li class="breadcrumb-item active" aria-current="page">新增課程</li>
     </ol>
   </nav>

    <div class="mb-3">
      <label for="class-name" class="form-label">課程名稱</label>
      <input type="text" class="form-control" id="class-name" placeholder="輸入課程名稱" required>
    </div>

    <div class="mb-3">
      <label for="label" class="form-label">課程標籤</label>

      <div class="d-flex justify-content-start">
        <div class="me-2">
          <select class="form-select" aria-label="Default select example">
           <option selected>不顯示</option>
           <option value="早鳥優惠">早鳥優惠</option>
          </select>
        </div>
        <input type="text" class="form-control" id="label" placeholder="輸入標籤名稱" required>
      </div>

    </div>

    <div class="mb-3">
      <label for="techer-name" class="form-label">老師姓名</label>
      <input type="text" class="form-control" id="techer-name" placeholder="輸入姓名" required>
    </div>

    <div class="mb-3">
      <label for="original-price" class="form-label">課程原價</label>
      <input type="text" class="form-control" id="original-price" placeholder="輸入原價" required>
    </div>

    <div class="mb-3">
      <label for="special-price" class="form-label">課程優惠價</label>
      <input type="text" class="form-control" id="special-price" placeholder="輸入優惠價" required>
    </div>

    <div class="mb-3">
      <label for="class-time" class="form-label">上課時間</label>
      <input type="text" class="form-control" id="class-time" required>
    </div>

    <div class="mb-3">
      <label for="class-time" class="form-label">上課教室</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>請選擇教室</option>
        <option value=""></option>
        <option value=""></option>
      </select>
    </div>

    <div class="mb-3">
     <label for="textArea" class="form-label">上課內容</label>   
     <textarea class="form-control" rows="5" id="textArea"></textarea>
   </div> 

  </div>
</template>