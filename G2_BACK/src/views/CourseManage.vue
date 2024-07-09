<template>
    <div style="width: 100%;" class="container">
        <div class="row py-5">
            <h1>課程管理</h1>
            <div class="button-wrap d-flex justify-content-between py-4">
                <div class="left-wrap d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary me-1" style="height: 40px;">課程內容管理</button>
                    <RouterLink to="/courseOrderManage">
                        <button type="button" class="btn btn-primary" style="height: 40px;">課程訂單管理</button>
                    </RouterLink>
                </div>
                <div class="right-wrap d-flex">
                    <div style="width: 320px;" class="input-group mb-3">
                        <input style="height: 40px;" type="text" class="form-control" placeholder="請輸入課程內容資訊"
                            aria-label="search-course-info" aria-describedby="button-search" />
                        <button class="btn btn-primary me-1" type="button" id="button-search">搜尋</button>
                    </div>
                    <RouterLink to="/addCourse">
                        <button type="button" class="btn btn-primary" style="height: 40px;">新增</button>
                    </RouterLink>
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
                    <tr v-for="course in courses" :key="course.id">
                        <th scope="row">{{ course.id }}</th>
                        <td>{{ course.name }}</td>
                        <td>{{ course.teacher }}</td>
                        <td>{{ course.time }}</td>
                        <th>{{ course.classroom }}</th>
                        <td>NT. {{ course.price }}</td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    :id="'flexSwitchCheck' + course.id" v-model="course.isActive">
                            </div>
                        </td>
                        <td>
                            <div class="button-wrap d-flex">
                                <RouterLink :to="'/addCourse/' + course.id">
                                    <button type="button" class="btn btn-primary d-flex align-items-center me-1"
                                        style="height: 40px;">
                                        編輯
                                    </button>
                                </RouterLink>
                                <button type="button" class="btn btn-secondary d-flex align-items-center"
                                    style="height: 40px;" @click="confirmDelete(course.id)">
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
            courses: [
                {
                    id: 1,
                    name: '品酒初級課程1',
                    teacher: '王大明',
                    time: '2024/05/01 14:00-2024/05/02 16:00',
                    classroom: 'A',
                    price: 3200,
                    isActive: true
                },
                // 可以添加更多課程數據
            ]
        }
    },
    methods: {
        confirmDelete(courseId) {
            if (confirm(`確定要刪除課程編號 ${courseId} 嗎？`)) {
                this.deleteCourse(courseId);
            }
        },
        deleteCourse(courseId) {
            // 在實際應用中，這裡通常會調用 API 來刪除數據
            // 這裡我們只是從前端數組中移除該課程
            this.courses = this.courses.filter(course => course.id !== courseId);
            alert(`課程編號 ${courseId} 已被刪除`);
        }
    }
}
</script>