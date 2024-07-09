<template>
  <div class="container">
    <div class="row py-5">
      <h1>新增課程</h1>
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
          <label for="courseDate" class="form-label">上課時間</label>
          <input type="date" class="form-control" id="courseDate" v-model="course.date" />
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
          <label for="courseContent" class="form-label">上課內容</label>
          <Editor
            v-model="course.content"
            :init="editorConfig"
            api-key="2plkyvquu1c7u3ajwp111jy99tfb0zahvamohkrdg3epfc7q"
          />
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink to="/courseManage">
            <button type="button" class="btn btn-secondary me-2" @click="cancelForm">取消</button>
          </RouterLink>
          <RouterLink to="/courseManage">
            <button type="submit" class="btn btn-primary">提交</button>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'AddCourseForm',
  components: {
    // Editor
  },
  data() {
    return {
      courseTagVisibility: 'hide', // 新增：控制課程標籤顯示狀態
      course: {
        name: '',
        tag: '',
        teacher: '',
        originalPrice: null,
        discountPrice: null,
        date: '',
        classroom: '',
        content: ''
      },
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
    submitForm() {
      console.log('提交的課程資料:', this.course)
      // 這裡添加提交邏輯
    },
    cancelForm() {
      // 這裡添加取消邏輯
      console.log('表單已取消')
      this.resetForm()
    },
    resetForm() {
      // 重置表單數據
      Object.keys(this.course).forEach((key) => {
        this.course[key] = ''
      })
      this.course.originalPrice = null
      this.course.discountPrice = null
    }
  }
}
</script>
