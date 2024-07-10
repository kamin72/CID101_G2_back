<template>
  <!-- 使用與 AddCoursePage 相同的模板結構 -->
  <div class="container">
    <div class="row py-5">
      <h1>編輯課程</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="courseName" class="form-label">課程名稱</label>
          <input
            type="text"
            class="form-control"
            id="courseName"
            v-model="course.name"
            placeholder="請輸入課程名稱"
          />
        </div>
        <div class="mb-3">
          <label for="courseTagVisibility" class="form-label">課程標籤顯示</label>
          <select class="form-select mb-2" id="courseTagVisibility" v-model="courseTagVisibility">
            <option value="hide">不顯示</option>
            <option value="show">顯示</option>
          </select>
          <label for="courseTag" class="form-label">課程標籤</label>
          <input
            type="text"
            class="form-control"
            id="courseTag"
            v-model="course.tag"
            placeholder="請輸入課程標籤"
            :disabled="courseTagVisibility === 'hide'"
            :class="{ 'is-invalid': courseTagVisibility === 'hide' }"
          />
          <div class="invalid-feedback">課程標籤目前設置為不顯示</div>
        </div>
        <div class="mb-3">
          <label for="teacherName" class="form-label">老師姓名</label>
          <input
            type="text"
            class="form-control"
            id="teacherName"
            v-model="course.teacher"
            placeholder="請輸入老師姓名"
          />
        </div>
        <div class="mb-3">
          <label for="originalPrice" class="form-label">課程原價</label>
          <input
            type="number"
            class="form-control"
            id="originalPrice"
            v-model="course.originalPrice"
            placeholder="請輸入課程原價"
          />
        </div>
        <div class="mb-3">
          <label for="discountPrice" class="form-label">課程優惠價</label>
          <input
            type="number"
            class="form-control"
            id="discountPrice"
            v-model="course.discountPrice"
            placeholder="請輸入課程優惠價"
          />
        </div>
        <div class="mb-3">
          <label for="courseStartTime" class="form-label">上課開始時間</label>
          <input
            type="datetime-local"
            class="form-control"
            id="courseStartTime"
            v-model="course.startTime"
          />
        </div>
        <div class="mb-3">
          <label for="courseEndTime" class="form-label">上課結束時間</label>
          <input
            type="datetime-local"
            class="form-control"
            id="courseEndTime"
            v-model="course.endTime"
            :class="{ 'is-invalid': !isEndTimeValid }"
          />
          <div class="invalid-feedback" v-if="!isEndTimeValid">結束時間必須晚於開始時間</div>
        </div>
        <div class="mb-3">
          <label for="classroom" class="form-label">上課教室</label>
          <select class="form-select" id="classroom" v-model="course.classroom">
            <option value="" disabled selected>請選擇教室</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="courseImage" class="form-label">課程圖片</label>
          <input
            type="file"
            class="form-control"
            id="courseImage"
            @change="handleImageUpload"
            accept="image/*"
          />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="課程圖片預覽"
            class="mt-2"
            style="max-width: 200px"
          />
        </div>
        <div class="mb-3">
          <label for="courseDesc" class="form-label">課程描述</label>
          <textarea
            class="form-control"
            id="courseDesc"
            v-model="course.desc"
            rows="3"
            placeholder="請輸入課程描述"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="courseIntro" class="form-label">課程介紹</label>
          <textarea
            class="form-control"
            id="courseIntro"
            v-model="course.intro"
            rows="5"
            placeholder="請輸入課程介紹"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="courseContent" class="form-label">上課內容</label>
          <Editor
            v-model="course.content"
            :init="editorConfig"
            api-key="2plkyvquu1c7u3ajwp111jy99tfb0zahvamohkrdg3epfc7q"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-secondary me-2" @click="cancelForm">取消</button>
          <button type="submit" class="btn btn-primary" :disabled="!isFormValid">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'EditCourseForm',
  components: {
    // Editor
  },

  data() {
    return {
      courseTagVisibility: 'hide',
      course: {
        id: '',
        name: '',
        tag: '',
        teacher: '',
        originalPrice: null,
        discountPrice: null,
        startTime: '',
        endTime: '',
        classroom: '',
        desc: '',
        intro: '',
        content: ''
      },
      imageFile: null,
      imagePreview: null
    }
  },

  created() {
    this.fetchCourseData()
  },

  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.imageFile = file
        this.imagePreview = URL.createObjectURL(file)
      }
    },

    fetchCourseData() {
      const courseId = this.$route.params.id
      const xhr = new XMLHttpRequest()
      const url = `${import.meta.env.VITE_API_URL}/courseManage/getCourse.php?id=${courseId}`
      xhr.open('GET', url, true)

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText)
            if (response.success) {
              this.course = {
                id: response.course.course_id,
                name: response.course.course_name,
                tag: response.course.course_ribbon || '',
                teacher: response.course.course_teacher,
                originalPrice: response.course.course_price,
                discountPrice: response.course.course_discount,
                startTime: this.formatDateTimeForInput(response.course.course_startTime),
                endTime: this.formatDateTimeForInput(response.course.course_endTime),
                classroom: response.course.course_room,
                desc: response.course.course_desc,
                intro: response.course.course_intro,
                content: response.course.course_content
              }
              this.courseTagVisibility = this.course.tag ? 'show' : 'hide'
            } else {
              alert('獲取課程數據失敗：' + response.message)
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

      xhr.send()
    },

    formatDateTimeForInput(dateTimeString) {
      // 將數據庫中的日期時間格式轉換為 input[type="datetime-local"] 所需的格式
      const date = new Date(dateTimeString)
      return date.toISOString().slice(0, 16) // 格式: YYYY-MM-DDTHH:mm
    },

    submitForm() {
      if (!this.validateForm()) {
        alert('請確保所有必填欄位都已填寫，且格式正確。')
        return
      }

      const formData = new FormData()
      // 添加其他表單數據
      formData.append('course_name', this.course.name)
      formData.append('course_teacher', this.course.teacher)
      formData.append('course_startTime', this.course.startTime)
      formData.append('course_endTime', this.course.endTime)
      formData.append('course_room', this.course.classroom)
      formData.append('course_price', this.course.originalPrice)
      formData.append('course_discount', this.course.discountPrice)
      formData.append('course_status', 'active')
      formData.append('course_ribbon', this.courseTagVisibility === 'show' ? this.course.tag : '')
      formData.append('course_desc', this.course.desc)
      formData.append('course_intro', this.course.intro)
      formData.append('course_content', this.course.content)

      // 添加圖片文件
      if (this.imageFile) {
        formData.append('course_image', this.imageFile)
      }

      const xhr = new XMLHttpRequest()
      const url = `${import.meta.env.VITE_API_URL}/courseManage/${this.isEditing ? 'updateCourse.php' : 'addCourse.php'}`
      xhr.open('POST', url, true)

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText)
            if (response.success) {
              alert(this.isEditing ? '課程更新成功！' : '課程新增成功！')
              this.$router.push({
                path: '/courseManage',
                query: { refresh: Date.now().toString() }
              })
            } else {
              alert((this.isEditing ? '課程更新' : '課程新增') + '失敗：' + response.message)
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

      xhr.send(formData)
    },

    validateForm() {
      return (
        this.course.name &&
        this.course.teacher &&
        this.course.startTime &&
        this.course.endTime &&
        this.course.classroom &&
        this.course.originalPrice &&
        this.course.desc &&
        this.course.intro &&
        this.course.content &&
        new Date(this.course.endTime) > new Date(this.course.startTime)
      )
    },

    cancelForm() {
      if (confirm('確定要取消編輯嗎？未保存的更改將會丟失。')) {
        this.$router.push('/courseManage')
      }
    }
  },

  computed: {
    isEndTimeValid() {
      return (
        !this.course.startTime ||
        !this.course.endTime ||
        new Date(this.course.endTime) > new Date(this.course.startTime)
      )
    },
    isFormValid() {
      return this.validateForm()
    }
  }
}
</script>
