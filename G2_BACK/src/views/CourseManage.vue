<template>
  <div style="width: 100%" class="container">
    <div class="row py-5">
      <h1>課程管理</h1>
      <div class="button-wrap d-flex justify-content-between py-4">
        <div class="left-wrap d-flex justify-content-between">
          <button type="button" class="btn btn-secondary me-1" style="height: 40px">
            課程內容管理
          </button>
          <RouterLink to="/courseOrderManage">
            <button type="button" class="btn btn-primary" style="height: 40px">課程訂單管理</button>
          </RouterLink>
        </div>
        <div class="right-wrap d-flex">
          <div style="width: 320px" class="input-group mb-3">
            <input style="height: 40px" type="text" class="form-control" placeholder="請輸入課程內容資訊"
              aria-label="search-course-info" aria-describedby="button-search" />
            <button class="btn btn-primary me-1" type="button" id="button-search">搜尋</button>
          </div>
          <RouterLink to="/addCoursePage">
            <button type="button" class="btn btn-primary" style="height: 40px">新增</button>
          </RouterLink>
        </div>
      </div>
      <table class="table align-middle course-table">
        <thead class="table-dark">
          <tr>
            <th class="fs-6" scope="col">課程編號</th>
            <th class="fs-6" scope="col">課程名稱</th>
            <th class="fs-6" scope="col">老師</th>
            <th class="fs-6" scope="col">上課時間</th>
            <th class="fs-6" scope="col">上課教室</th>
            <th class="fs-6" scope="col">課程價格</th>
            <th class="fs-6" scope="col">折扣</th>
            <th class="fs-6" scope="col">上架狀態</th>
            <th class="fs-6" scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.course_id">
            <th scope="row" class="fs-6 nowrap">{{ course.course_id }}</th>
            <td class="fs-6 nowrap">{{ course.course_name }}</td>
            <td class="fs-6 nowrap">{{ course.course_teacher }}</td>
            <td class="fs-6">
              {{ formatDateTime(course.course_startTime) }} -<br />
              {{ formatDateTime(course.course_endTime) }}
            </td>
            <td class="fs-6 nowrap">{{ course.course_room }}</td>
            <td class="fs-6 nowrap">NT$ {{ course.course_price }}</td>
            <td class="fs-6 nowrap">{{ course.course_discount || '無' }}</td>
            <td class="fs-6 nowrap">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" :id="'flexSwitchCheck' + course.course_id"
                  :checked="course.course_status === 'active'" @change="toggleCourseStatus(course.course_id)" />
              </div>
            </td>
            <td class="fs-6 nowrap">
              <div class="button-wrap d-flex">
                <RouterLink :to="{ name: 'editCoursePage', params: { id: course.course_id } }">
                  <button type="button" class="btn btn-primary btn-sm d-flex align-items-center me-1">
                    編輯
                  </button>
                </RouterLink>
                <button type="button" class="btn btn-danger btn-sm d-flex align-items-center"
                  @click="confirmDelete(course.course_id)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: []
    }
  },

  methods: {
    async fetchCourses() {
      try {
        const url = `${import.meta.env.VITE_API_URL}/courseManage/getCourses.php`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.error) {
          console.error('Error fetching courses:', data.message)
        } else {
          this.courses = data.courses
        }
      } catch (e) {
        console.error('Error fetching courses:', e)
      }
    },

    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString)
      return date.toLocaleString('zh-TW')
    },

    toggleCourseStatus(courseId) {
      // 這裡添加切換課程狀態的邏輯
      console.log(`切換課程 ${courseId} 的狀態`)
    },

    confirmDelete(courseId) {
      if (confirm(`確定要刪除課程編號 ${courseId} 嗎？`)) {
        this.deleteCourse(courseId)
      }
    },

    deleteCourse(courseId) {
      const xhr = new XMLHttpRequest()
      const url = `${import.meta.env.VITE_API_URL}/courseManage/deleteCourse.php`
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/json')

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText)
            if (response.success) {
              alert('課程刪除成功！')
              this.fetchCourses() // 重新獲取課程列表
            } else {
              alert('課程刪除失敗：' + response.message)
            }
          } catch (e) {
            console.error('Error parsing JSON:', e)
            alert('發生錯誤，請稍後再試。')
          }
        } else {
          console.error('HTTP error', xhr.status, xhr.statusText)
          alert('發生錯誤，請稍後再試。')
        }
      }

      xhr.onerror = () => {
        console.error('Network error')
        alert('網絡錯誤，請檢查您的連接。')
      }

      xhr.send(JSON.stringify({ course_id: courseId }))
    }
  },
  mounted() {
    this.fetchCourses();

    this.$watch(
      () => this.$route.query,
      (query) => {
        if (query.refresh) {
          this.fetchCourses();
        }
      },
      { immediate: true }
    );
  }
}
</script>

<style scoped>
.course-table {
  font-size: 0.85rem;
}

.course-table th,
.course-table td {
  vertical-align: middle;
  text-align: center;
}

.small-text {
  font-size: 0.85rem;
}

.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-sm {
  padding: 0.38rem 0.8rem;
  font-size: 0.85rem;
}

.date-time {
  white-space: nowrap;
  line-height: 1.2;
}

td:nth-child(4) {
  white-space: normal;
}

/* 為了確保開關和按鈕在單元格中居中 */
.form-check.form-switch,
.button-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
