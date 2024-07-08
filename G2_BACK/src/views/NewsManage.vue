<template>
  <div style="width: 100%" class="container">
    <div class="row py-5">
      <h1>最新消息管理</h1>
      <div class="button-wrap d-flex justify-content-end py-4">
        <div class="right-wrap d-flex">
          <div class="input-group mb-3 me-2" style="width: 320px">
            <span class="input-group-text" id="basic-addon1">搜尋</span>
            <input
              style="height: 40px"
              type="text"
              class="form-control"
              placeholder="請輸入文章標題或內容"
              aria-label="Username"
              aria-describedby="basic-addon1"
              v-model="search"
            />
          </div>
          <button type="button" class="btn btn-primary" style="height: 40px" @click="openAddForm()">
            新增
          </button>
        </div>
      </div>
      <table class="table align-middle">
        <thead class="table-dark">
          <tr>
            <th scope="col">編號</th>
            <th scope="col">圖片</th>
            <th scope="col">標題</th>
            <th scope="col">內容</th>
            <th scope="col">發布時間</th>
            <th scope="col">狀態</th>
            <th scope="col">管理</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedNews" :key="item.news_id">
            <th scope="row">{{ item.news_id }}</th>
            <td style="width: 150px">
              <img :src="'../../../../image/news/' + item.news_img" alt="Image Preview" />{{
                item.news_img
              }}
            </td>
            <td style="width: 150px">{{ item.news_title }}</td>
            <td>
              <div
                class="text-nowrap"
                style="width: 10rem; text-overflow: ellipsis; overflow: hidden"
              >
                {{ item.news_content }}
              </div>
            </td>
            <td>{{ item.news_date }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  :checked="item.news_active === 1"
                  @change="toggleActive(item)"
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">{{
                  item.news_active === 1 ? '上架' : '下架'
                }}</label>
              </div>
            </td>
            <td>
              <div class="button-wrap d-flex">
                <button
                  type="button"
                  class="btn btn-primary d-flex align-items-center me-1"
                  style="height: 40px"
                  @click="openEditForm(item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-secondary d-flex align-items-center"
                  style="height: 40px"
                  @click="confirmDelete(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
  <!-- 遮罩 -->
  <div
    v-if="showAddUpdateForm"
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
  <!-- Lightbox -->
  <div
    v-if="showAddUpdateForm"
    class="mb-3 z-3"
    style="
      width: 500px;
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
    <div class="card-header">
      <legend>{{ isEditing ? '修改文章' : '新增文章' }}</legend>
    </div>
    <form @submit.prevent="addUpdateForm" id="addUpdateForm">
      <div class="mb-3">
        <label for="news_img" class="form-label">圖片</label>
        <input type="file" class="form-control" id="news_img" @change="onFileChange" />
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="Image Preview"
          style="max-width: 100%; height: 100px; margin-top: 10px"
        />
        <img
          v-if="!previewImage && originalImage"
          :src="'../../../../image/news/' + originalImage"
          alt="Image"
          style="max-width: 100%; height: 100px; margin-top: 10px"
        />
      </div>
      <div class="mb-3">
        <label for="news_title" class="form-label">標題</label>
        <input type="text" class="form-control" id="news_title" v-model="newsForm.news_title" />
      </div>
      <div class="mb-3">
        <label for="news_content" class="form-label">內容</label>
        <textarea
          type="text"
          class="form-control"
          id="news_content"
          v-model="newsForm.news_content"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="news_date" class="form-label">發布時間</label>
        <input
          type="datetime-local"
          step="1"
          class="form-control"
          id="news_date"
          v-model="newsForm.news_date"
        />
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <button type="submit" class="btn btn-primary col-6">
          {{ isEditing ? '儲存' : '新增' }}
        </button>
        <button type="button" class="btn btn-secondary col-6" @click="closeForm()">
          {{ isEditing ? '確認' : '取消' }}
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
      itemsPerPage: 3, // 每頁顯示的資料數量
      search: '', //搜尋
      showAddUpdateForm: false, //新增or編輯視窗
      isEditing: false, //讓程式判斷是否為編輯模式的狀態
      news: [],
      newsForm: {
        news_img: '',
        news_title: '',
        news_content: '',
        news_date: '',
        news_active: 0, //0預設下架 1上架 2手動下架
        news_id: ''
      },
      previewImage: '', //預覽上傳圖片
      originalImage: '' //顯示原本圖片
    }
  },
  computed: {
    filteredNews() {
      const searchTerm = this.search.toLowerCase()
      return this.news
        .filter(
          (item) =>
            item.news_title.toLowerCase().includes(searchTerm) ||
            item.news_content.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) => b.news_id - a.news_id)
    },
    paginatedNews() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredNews.slice(startIndex, startIndex + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage)
    }
  },
  methods: {
    setPage(page) {
      this.currentPage = page
    },
    onFileChange(e) {
      let file = e.target.files[0]
      if (!file) return

      let fileType = file.type.split('/')[0]
      if (fileType !== 'image') {
        alert('檔案格式必須是圖檔')
        e.target.value = ''
        return
      }

      if (file.size > 2048000) {
        alert('檔案不得超過2M, 請重新挑選')
        e.target.value = ''
        return
      }

      this.newsForm.news_img = file
      this.previewImage = URL.createObjectURL(file) // 生成图片预览的URL
    },
    //刪除
    confirmDelete(item) {
      if (confirm(`確定要刪除文章 編號 ${item.news_id} 嗎？`)) {
        this.deleteNews(item)
      }
    },
    deleteNews(item) {
      fetch(
        `http://localhost/CID101_G2/CID101_G2_php/back/newsManage/news_delete.php?news_id=${item.news_id}`,
        {
          method: 'GET'
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            this.fetchNewsData()
            alert('文章刪除成功')
          } else {
            alert('刪除失敗: ' + result.msg)
          }
        })
        .catch((error) => {
          console.error('刪除失敗:', error)
          alert('刪除失敗')
        })
    },
    //抓取資料庫資料
    fetchNewsData() {
      fetch('http://localhost/CID101_G2/CID101_G2_php/back/newsManage/news_read.php')
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.news) {
            this.news = data.news
            localStorage.setItem('news', JSON.stringify(this.news))
          }
        })
    },
    //新增視窗
    openAddForm() {
      this.showAddUpdateForm = true
      this.isEditing = false
      this.previewImage = '' // 清空图片预览
      this.originalImage = '' // 清空原始图片路径
    },
    //編輯視窗
    openEditForm(item) {
      this.showAddUpdateForm = true
      this.isEditing = true
      this.newsForm = { ...item }
      this.previewImage = '' // 清空图片预览
      this.originalImage = item.news_img // 设置原始图片路径
    },
    //關閉視窗
    closeForm() {
      this.showAddUpdateForm = false
      this.isEditing = false
      this.newsForm = {}
      this.previewImage = '' // 清空图片预览
      this.originalImage = '' // 清空原始图片路径
    },
    setDefaultTime() {
      const now = new Date()
      // 加上8個小時的毫秒數
      const gmt8 = new Date(now.getTime() + 8 * 60 * 60 * 1000)
      // 格式化日期为 'YYYY-MM-DD HH:mm:ss'
      const DefaultTime = gmt8.toISOString().slice(0, 19).replace('T', ' ')
      this.newsForm.news_date = DefaultTime
    },
    //新增or修改
    addUpdateForm() {
      let apiUrl = 'http://localhost/CID101_G2/CID101_G2_php/back/newsManage/news_add.php'
      if (this.isEditing) {
        apiUrl = 'http://localhost/CID101_G2/CID101_G2_php/back/newsManage/news_update.php'
      }
      if (!this.isEditing && this.newsForm.news_img === '') {
        alert('没選圖片')
        return
      }
      if (this.newsForm.news_date == '') {
        this.setDefaultTime()
        this.newsForm.news_active = 1
      }

      let newsData = new FormData()
      if (this.previewImage) {
        newsData.append('news_img', this.newsForm.news_img)
      } else {
        newsData.append('original', this.originalImage)
      }
      newsData.append('news_title', this.newsForm.news_title)
      newsData.append('news_content', this.newsForm.news_content)
      newsData.append('news_date', this.newsForm.news_date)
      newsData.append('news_active', this.newsForm.news_active)
      newsData.append('news_id', this.newsForm.news_id)

      fetch(apiUrl, {
        method: 'POST',
        body: newsData
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            alert(this.isEditing ? '修改成功' : '新增成功')
            this.showAddUpdateForm = false
            this.isEditing = false // 重置編輯狀態
            this.newsForm = {
              news_img: '',
              news_title: '',
              news_content: '',
              news_date: '',
              news_active: '',
              news_id: ''
            }
            this.fetchNewsData()
          } else {
            alert('操作失敗: ' + result.msg)
          }
        })
        .catch((error) => {
          console.error('操作失敗:', error)
          alert('操作失敗')
        })
    },
    toggleActive(item) {
      let newStatus
      switch (item.news_active) {
        case 0:
          newStatus = 1 // 預設下架改成上架
          break
        case 1:
          newStatus = 2 // 上架改成手動下架
          break
        case 2:
          newStatus = 1 // 手動下架變上架
          break
        default:
          newStatus = item.news_active // 默认保持不变
          break
      }
      item.news_active = newStatus
      let newsData = new FormData()
      newsData.append('news_id', item.news_id)
      newsData.append('news_active', item.news_active)
      newsData.append('original', item.news_img)
      newsData.append('news_title', item.news_title)
      newsData.append('news_content', item.news_content)
      newsData.append('news_date', item.news_date)

      fetch('http://localhost/CID101_G2/CID101_G2_php/back/newsManage/news_update.php', {
        method: 'POST',
        body: newsData
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            alert('操作失敗: ' + result.msg)
          } else {
            alert('狀態更新成功')
          }
        })
        .catch((error) => {
          console.error('狀態更新失敗:', error)
          alert('狀態更新失敗')
        })
    },
    //檢查預設上架文章
    checkNewsStatus() {
      const now = new Date()
      this.news.forEach((item) => {
        const newsDate = new Date(item.news_date)
        if (newsDate <= now && item.news_active === 0) {
          this.toggleActive(item)
        }
      })
    }
  },
  created() {
    this.fetchNewsData()
    setInterval(this.checkNewsStatus, 1000)
  }
}
</script>
