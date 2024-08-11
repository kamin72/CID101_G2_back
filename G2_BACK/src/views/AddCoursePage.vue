<template>
  <div class="container">
    <div class="row py-5">
      <h1>新增課程</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="courseName" class="form-label">課程名稱</label>
          <input type="text" class="form-control" id="courseName" v-model="course.name" placeholder="請輸入課程名稱" />
        </div>
        <div class="mb-3">
          <label for="courseTagVisibility" class="form-label">課程標籤顯示</label>
          <select class="form-select mb-2" id="courseTagVisibility" v-model="courseTagVisibility">
            <option value="hide">不顯示</option>
            <option value="show">顯示</option>
          </select>
          <label for="courseTag" class="form-label">課程標籤</label>
          <input type="text" class="form-control" id="courseTag" v-model="course.tag" placeholder="請輸入課程標籤"
            :disabled="courseTagVisibility === 'hide'" :class="{ 'is-invalid': courseTagVisibility === 'hide' }" />
          <div class="invalid-feedback">課程標籤目前設置為不顯示</div>
        </div>
        <div class="mb-3">
          <label for="teacherName" class="form-label">老師姓名</label>
          <input type="text" class="form-control" id="teacherName" v-model="course.teacher" placeholder="請輸入老師姓名" />
        </div>
        <div class="mb-3">
          <label for="originalPrice" class="form-label">課程原價</label>
          <input type="number" class="form-control" id="originalPrice" v-model="course.originalPrice"
            placeholder="請輸入課程原價" />
        </div>
        <div class="mb-3">
          <label for="discountPrice" class="form-label">課程優惠價</label>
          <input type="number" class="form-control" id="discountPrice" v-model="course.discountPrice"
            placeholder="請輸入課程優惠價" />
        </div>
        <div class="mb-3">
          <label for="courseStartTime" class="form-label">上課開始時間</label>
          <input type="datetime-local" class="form-control" id="courseStartTime" v-model="course.startTime" />
        </div>
        <div class="mb-3">
          <label for="courseEndTime" class="form-label">上課結束時間</label>
          <input type="datetime-local" class="form-control" id="courseEndTime" v-model="course.endTime"
            :class="{ 'is-invalid': !isEndTimeValid }" />
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
          <input type="file" class="form-control" id="courseImage" @change="handleImageUpload" accept="image/*" />
          <img v-if="imagePreview" :src="imagePreview" alt="課程圖片預覽" class="mt-2" style="max-width: 200px" />
        </div>
        <div class="mb-3">
          <label for="courseDesc" class="form-label">課程描述</label>
          <textarea class="form-control" id="courseDesc" v-model="course.desc" rows="3"
            placeholder="請輸入課程描述"></textarea>
        </div>
        <div class="mb-3">
          <label for="courseIntro" class="form-label">課程介紹</label>
          <textarea class="form-control" id="courseIntro" v-model="course.intro" rows="5"
            placeholder="請輸入課程介紹"></textarea>
        </div>
        <div class="mb-3">
          <label for="courseContent" class="form-label">上課內容</label>
          <Editor v-model="course.content" :init="editorConfig"
            api-key="2plkyvquu1c7u3ajwp111jy99tfb0zahvamohkrdg3epfc7q" />
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink to="/courseManage">
            <button type="button" class="btn btn-secondary me-2" @click="cancelForm">取消</button>
          </RouterLink>
          <RouterLink to="/courseManage">
            <button type="submit" class="btn btn-primary" @click="submitForm" :disabled="!isFormValid">
              提交
            </button>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'AddCourseForm',
  components: {
    Editor
  },

  data() {
    return {
      courseTagVisibility: 'hide',
      course: {
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
      imagePreview: null,
      editorConfig: {
        height: 400,
        menubar: true, // 啟用菜單欄以訪問更多功能
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | code | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        // 允許更多的 HTML 標籤和屬性
        extended_valid_elements: 'script[src|async|defer|type|charset]',
        custom_elements: 'script',
        valid_children: '+body[style]',
        verify_html: false // 禁用 HTML 驗證，允許所有 HTML（請謹慎使用）
      }
    }
  },

  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.imageFile = file
        this.imagePreview = URL.createObjectURL(file)
      }
    },

    submitForm() {
      console.log('提交的課程資料:', this.course)

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
      // 添加課程 ID
      formData.append('course_id', this.course.id)

      // 添加圖片文件
      if (this.imageFile) {
        formData.append('course_image', this.imageFile)
      }

      // 修改：如果優惠價格為空，則不添加到 formData
      if (this.course.discountPrice !== null && this.course.discountPrice !== '') {
        formData.append('course_discount', this.course.discountPrice);
      }

      const xhr = new XMLHttpRequest()
      const url = `${import.meta.env.VITE_API_URL}/courseManage/addCourse.php`
      xhr.open('POST', url, true)

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              alert('課程新增成功！');
              this.$router.push({
                path: '/courseManage',
                query: { refresh: Date.now().toString() }
              });
            } else {
              alert('課程新增失敗：' + response.message);
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

    cancelForm() {
      // 保持原有的取消邏輯
      console.log('表單已取消')
      this.resetForm()
      this.$router.push('/courseManage')
    },

    resetForm() {
      // 保持原有的重置邏輯
    }
  },

  computed: {
    isEndTimeValid() {
      if (this.course.startTime && this.course.endTime) {
        return new Date(this.course.endTime) > new Date(this.course.startTime)
      }
      return true // 如果任一時間未設置，暫時視為有效
    },
    isFormValid() {
      return (
        this.isEndTimeValid &&
        this.course.name &&
        this.course.teacher &&
        this.course.originalPrice && // 確保原價必填
        this.course.desc &&
        this.course.intro
      )
    }
  }
}
</script>
