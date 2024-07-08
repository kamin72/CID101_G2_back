<template>
  <div class="container" style="width: 100%;">
    <div class="row py-5">
      <h1>會員管理</h1>
      <div class="button-wrap d-flex justify-content-between py-4">
        <div class="left-wrap d-flex justify-content-between">
          <button type="button" class="btn btn-primary me-1" style="height: 40px;">一般會員</button>
          <button type="button" class="btn btn-secondary" style="height: 40px;">批發商會員</button>
          <button type="button" class="btn btn-secondary" style="height: 40px;margin: 0 4px">審核列表</button>
        </div>
        <div class="right-wrap d-flex">
          <div style="width: 320px;" class="input-group mb-3">
            <input style="height: 40px;" type="text" class="form-control" placeholder="請輸入會員資料"
              aria-label="search-course-info" aria-describedby="button-search" />
            <button class="btn btn-primary me-1" type="button" id="button-search">搜尋</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">會員編號</th>
          <th scope="col">姓名</th>
          <th scope="col">帳號</th>
          <th scope="col">電話</th>
          <th scope="col">Email</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members['members']" :key="member.no">
          <th scope="row" class="align-middle">{{ member.no }}</th>
          <td class="align-middle">{{ member?.name }}</td>
          <td class="align-middle">{{ member?.account }}</td>
          <td class="align-middle">{{ member?.phone }}</td>
          <td class="align-middle">{{ member?.email }}</td>
          <!-- <td>
            <div class="form-check form-switch col">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            </div>
          </td> -->
          <td class="d-flex gap-2 justify-content-center">
            <RouterLink to="/editMember">
              <button type="button" class="btn btn-primary">編輯</button>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

      <!-- 頁碼 -->
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

<script>
export default {
  data() {
    return {
      members: []
    }
  },
  methods: {
    // parseServerImg(file) {
    //   // return ${import.meta.env.VITE_FILE_URL}/${file}
    //   return new URL(`../assets/img/wine/${file}`, import.meta.url).href
    // },
    fetchData() {
      fetch('http://localhost/CID101_G2_php/back/orderManage/memberManage.php')
      .then((response) => response.json())
      .then((data) => {
         // 添加這行來檢查接收到的數據
          this.members = data;
          console.log(this.members);
        })
    },
  },
  mounted() {
    this.fetchData();
  },
  created() {},
}
</script>