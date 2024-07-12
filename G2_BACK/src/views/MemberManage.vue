<template>
  <div class="container" style="width: 100%">
    <div class="row py-5">
      <h1>會員管理</h1>
      <div class="button-wrap d-flex justify-content-between py-4">
        <div class="left-wrap d-flex justify-content-between">
          <button
            @click="searchMember(1)"
            type="button"
            class="btn me-1"
            :class="{ 'btn-primary': normal_button_action, 'btn-secondary': !normal_button_action }"
            style="height: 40px"
          >
            一般會員
          </button>
          <button
            @click="searchMember(2)"
            type="button"
            class="btn"
            :class="{
              'btn-primary': wholesaler_button_action,
              'btn-secondary': !wholesaler_button_action
            }"
            style="height: 40px"
          >
            批發商會員
          </button>
          <button
            @click="searchMember(3)"
            type="button"
            class="btn"
            :class="{ 'btn-primary': review_button_action, 'btn-secondary': !review_button_action }"
            style="height: 40px; margin: 0 4px"
          >
            待審核
          </button>
          <button
            @click="searchMember(4)"
            type="button"
            class="btn"
            :class="{ 'btn-primary': failed_button_action, 'btn-secondary': !failed_button_action }"
            style="height: 40px; margin: 0 4px"
          >
            審核未通過
          </button>
        </div>

        <div class="right-wrap d-flex">
          <div class="input-group mb-3 me-2" style="width: 320px">
            <span class="input-group-text" id="basic-addon1">搜尋</span>
            <input
              style="height: 40px"
              type="text"
              class="form-control"
              placeholder="請輸入會員資訊"
              aria-label="Username"
              aria-describedby="basic-addon1"
              v-model="search"
            />
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
          <th scope="col">狀態</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in paginatedMember" :key="member.no">
          <th scope="row" class="align-middle">{{ member.no }}</th>
          <td class="align-middle">{{ member?.name }}</td>
          <td class="align-middle">{{ member?.account }}</td>
          <td class="align-middle">{{ member?.phone }}</td>
          <td class="align-middle">{{ member?.email }}</td>
          <td class="align-middle">
            <span v-if="member.status === 0">審核中</span>
            <span v-else-if="member.status === 1">啟用中</span>
            <span v-else-if="member.status === 2">已停用</span>
            <span v-else-if="member.status === 3">審核未通過</span>
          </td>
          <td class="d-flex gap-2">
            <button type="button" class="btn btn-primary" @click="openMemberInfo(member)">
              詳情
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 頁碼 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="currentPage > 1 && setPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="setPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="currentPage < totalPages && setPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <!-- 遮罩 -->
  <div
    v-if="showMemberInfo"
    class="overlay z-2"
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    "
  ></div>
  <!--Lightbox -->
  <div
    v-if="showMemberInfo"
    class="mb-3 z-3 d-flex flex-wrap"
    style="
      max-width: 1000px;
      padding: 20px;
      border: 1px black solid;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
    "
  >
    <div class="card-header w-100">
      <legend>{{ memberInfo.identity == 1 ? '一般會員詳情' : '批發商詳情' }}</legend>
    </div>
    <form @submit.prevent="updateStatus" id="memberInfo" class="w-100 row">
      <div class="memberInfo col">
        <div class="mb-3 row">
          <label for="createDate" class="col-sm-4 col-form-label">建立日期</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="createDate"
              v-model="memberInfo.created_at"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="createDate" class="col-sm-4 col-form-label">修改日期</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="updateDate"
              v-model="memberInfo.updated_at"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="memberNo" class="col-sm-4 col-form-label">會員編號</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="memberNo"
              v-model="memberInfo.no"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="memberName" class="col-sm-4 col-form-label">姓名</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="memberName"
              v-model="memberInfo.name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="memberNo" class="col-sm-4 col-form-label">帳號</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="memberNo"
              v-model="memberInfo.no"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="memberPhone" class="col-sm-4 col-form-label">電話</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="memberPhone"
              v-model="memberInfo.phone"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="memberEmail" class="col-sm-4 col-form-label">email</label>
          <div class="col-sm-8">
            <p id="memberEmail">{{ memberInfo.email }}</p>
          </div>
        </div>
      </div>
      <div class="retailerInfo col" v-if="memberInfo.identity == 2">
        <div class="mb-3 row">
          <label for="retailerNo" class="col-sm-5 col-form-label">批發商編號</label>
          <div class="col-sm-7">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="retailerNo"
              v-model="memberInfo.retailer_no"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="taxId" class="col-sm-5 col-form-label">統一編號</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="taxId" v-model="memberInfo.tax_id" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="companyName" class="col-sm-5 col-form-label">公司名稱</label>
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="companyName"
              v-model="memberInfo.company_name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="address" class="col-sm-5 col-form-label">公司地址</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="address" v-model="memberInfo.address" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="license" class="col-sm-5 col-form-label">許可證</label>
          <div class="col-sm-12">
            <a :href="downloadLink" download="license.jpg" class="form-control-plaintext">查看</a>
            <p id="license">{{ memberInfo.license }}</p>
          </div>
        </div>
      </div>

      <div class="mb-3 row w-100" v-if="memberInfo.identity == 1">
        <label for="memberStatus" class="col-sm-4 col-form-label">狀態</label>
        <div class="col-sm-8">
          <select
            class="form-select"
            v-model="memberInfo.status"
            aria-label="Default select example"
          >
            <option value="1">啟用</option>
            <option value="2">停用</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row" v-if="memberInfo.identity == 2">
        <label for="memberStatus" class="col-sm-2 col-form-label">狀態</label>
        <div class="col-sm-10">
          <select
            class="form-select"
            v-model="memberInfo.status"
            aria-label="Default select example"
          >
            <option value="0">審核中</option>
            <option value="1">審核通過/啟用</option>
            <option value="3">審核未通過</option>
            <option value="2">停用</option>
          </select>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <button type="submit" class="btn btn-primary col-6">儲存</button>
        <button type="button" class="btn btn-secondary col-6" @click="showMemberInfo = false">
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 當前頁碼
      itemsPerPage: 10, // 每頁顯示的資料數量
      search: '',
      showMemberInfo: false,
      members: [],
      temp: [],
      memberInfo: {
        license: 'path/to/license.jpg'
        // created_at: '',
        // updated_at: '',
        // no: '',
        // name: '',
        // account: '',
        // phone: '',
        // email: '',
        // status: '',
        // identity:'',
      },
      normal_button_action: true,
      wholesaler_button_action: false,
      review_button_action: false,
      failed_button_action: false
    }
  },
  computed: {
    downloadLink() {
      return `${import.meta.env.VITE_FILE_URL}/${this.memberInfo.license}` // 假設服務器提供下載的 API
    },
    filteredMember() {
      const searchTerm = this.search.toLowerCase()

      return this.members
        .filter((item) => {
          // 搜索條件
          const matchesSearch =
            this.search === '' ||
            String(item.no).toLowerCase().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm) ||
            item.account.toLowerCase().includes(searchTerm) ||
            item.phone.toLowerCase().includes(searchTerm) ||
            item.email.toLowerCase().includes(searchTerm)

          // 按鈕條件
          const matchesButton =
            (!this.normal_button_action &&
              !this.wholesaler_button_action &&
              !this.review_button_action &&
              !this.failed_button_action) || // 如果沒有按鈕被選中
            (this.normal_button_action && item.identity === 1 && [1, 2].includes(item.status)) ||
            (this.wholesaler_button_action &&
              item.identity === 2 &&
              [1, 2].includes(item.status)) ||
            (this.review_button_action && item.identity === 2 && item.status === 0) ||
            (this.failed_button_action && item.identity === 2 && item.status === 3)

          // 同時滿足搜索和按鈕條件
          return matchesSearch && matchesButton
        })
        .sort((a, b) => b.no - a.no) // 排序
    },
    paginatedMember() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredMember.slice(startIndex, startIndex + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.filteredMember.length / this.itemsPerPage)
    }
  },
  methods: {
    searchMember(n) {
      this.normal_button_action = false
      this.wholesaler_button_action = false
      this.review_button_action = false
      this.failed_button_action = false

      if (n === 1) {
        this.normal_button_action = true
      } else if (n === 2) {
        this.wholesaler_button_action = true
      } else if (n === 3) {
        this.review_button_action = true
      } else if (n === 4) {
        this.failed_button_action = true
      }
    },
    setPage(page) {
      this.currentPage = page
    },
    openMemberInfo(member) {
      this.showMemberInfo = true
      this.memberInfo = { ...member }
      this.memberInfo.originalStatus = this.memberInfo.status
    },
    fetchMemberData() {
      fetch(`${import.meta.env.VITE_API_URL}/memberManage/getMember.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.members) {
            this.members = data.members.map((member) => ({
              ...member,
              phone: member.phone.toString()
            }))
            this.temp = data.members.map((member) => ({
              ...member,
              phone: member.phone.toString()
            }))
            // localStorage.setItem('members', JSON.stringify(this.members))
          }
        })
    },
    updateStatus() {
      // 准备要发送的数据
      let updateData = {
        no: this.memberInfo.no,
        status: this.memberInfo.status
      }

      // 如果是批发商会员，添加其他需要更新的字段
      if (this.memberInfo.identity === 2) {
        updateData.company_name = this.memberInfo.company_name
        updateData.tax_id = this.memberInfo.tax_id
        updateData.address = this.memberInfo.address
      }

      fetch(`${import.meta.env.VITE_API_URL}/memberManage/updateStatus.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else {
            alert('更新資料/狀態成功')
            this.fetchMemberData()
            this.showMemberInfo = false
          }
        })
    }
  },
  mounted() {
    this.fetchMemberData()
  }
}
</script>
