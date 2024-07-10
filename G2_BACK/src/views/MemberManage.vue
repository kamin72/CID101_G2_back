<template>
  <div class="container" style="width: 100%;">
    <div class="row py-5">
      <h1>會員管理</h1>
      <div class="button-wrap d-flex justify-content-between py-4">
        <div class="left-wrap d-flex justify-content-between">
          <button @click="searchMember(1,1)" type="button" class="btn me-1" :class="{'btn-primary': this.normal_button_action, 'btn-secondary': !normal_button_action}" style="height: 40px;">一般會員</button>
          <button @click="searchMember(1,2)" type="button" class="btn" :class="{'btn-primary': this.wholesaler_button_action, 'btn-secondary': !wholesaler_button_action}" style="height: 40px;">批發商會員</button>
          <button @click="searchMember(0,2)" type="button" class="btn" :class="{'btn-primary': this.review_button_action, 'btn-secondary': !review_button_action}" style="height: 40px;margin: 0 4px">審核列表</button>
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
        <tr v-for="member in members" :key="member.no">
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
      members: [],
      normal_button_action:true,
      wholesaler_button_action:false,
      review_button_action:false,
    }
  },
  methods: {
    // parseServerImg(file) {
    //   // return ${import.meta.env.VITE_FILE_URL}/${file}
    //   return new URL(`../assets/img/wine/${file}`, import.meta.url).href
    // },

    searchMember(status,identity){

      this.normal_button_action=false
      this.wholesaler_button_action=false
      this.review_button_action=false

      if(status==1 && identity==1){
        this.normal_button_action=true
      }else if(status==1 && identity==2){
        this.wholesaler_button_action=true
      }else{
        this.review_button_action=true
      }

      const formData = {
        status: status,
        identity: identity,
      }
      const form = new URLSearchParams(formData)
      fetch('http://localhost/CID101_G2_php/back/memberManage/getMember.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
      })
      .then((response) => response.json())
      .then((data) => {
        // 添加這行來檢查接收到的數據
        this.members = data.members;
      })
    },

    // fetchData() {
    //   fetch('http://localhost/CID101_G2_php/back/memberManage/getMember.php')
    //   .then((response) => response.json())
    //   .then((data) => {
    //      // 添加這行來檢查接收到的數據
    //       this.members = data;
    //       console.log(this.members);
    //     })
    // },
  },
  mounted() {
    this.searchMember(1,1);
  },
  created() {},
}
</script>