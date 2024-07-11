<template>
    <div style="width: 100%;" class="container">
        <div class="row py-5">
            <h1>問答管理</h1>
            <div class="button-wrap d-flex justify-content-end py-4">
                <div class="right-wrap d-flex">
                    
                        <div class="input-group mb-3 me-2" style="width: 320px;">
                            
                        <span class="input-group-text" id="basic-addon1">搜尋</span>
                        <input style="height: 40px;" type="text" class="form-control" placeholder="請輸入題目或選項內容" aria-label="Username" aria-describedby="basic-addon1" v-model="search"/>
                        </div>
                        <button type="button" class="btn btn-primary" style="height: 40px;" @click="openAddForm()">新增</button>
                </div>
                

            </div>
            <table class="table align-middle">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">編號</th>
                        <th scope="col">題目</th>
                        <th scope="col">選項A</th>
                        <th scope="col">選項B</th>
                        <th scope="col">答案</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedQuiz" :key="item.q_no">
                        <th scope="row">{{ item.q_no }}</th>
                        <td style="width: 250px;">{{ item.q_name }}</td>
                        <td style="width: 220px;">{{ item.q_option_a }}</td>
                        <td style="width: 220px;">{{ item.q_option_b }}</td>
                        <td>{{ item.q_ans }}</td>
                        <td>
                            <div class="button-wrap d-flex">
                                    <button type="button" class="btn btn-primary d-flex align-items-center me-1"
                                    style="height: 40px;" @click="openEditForm(item)">編輯
                                    </button>
                                    <button type="button" class="btn btn-secondary d-flex align-items-center"
                                    style="height: 40px;" @click="confirmDelete(item)">刪除
                                    </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" aria-label="Previous" @click.prevent="currentPage > 1 && setPage(currentPage - 1)">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                            <a class="page-link" href="#" @click.prevent="setPage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" aria-label="Next" @click.prevent="currentPage < totalPages && setPage(currentPage + 1)">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
        </div>
    </div>
    <!-- 遮罩 -->
    <div v-if="showAddUpdateForm" class="overlay z-2" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;background-color: rgba(0, 0, 0, 0.5);"></div>
    <!-- 新增優惠券的 Lightbox -->
    <div  v-if="showAddUpdateForm" class="mb-3 z-3" style="width: 500px;padding: 20px; border: 1px black solid; border-radius: 10px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white;">
            <div class="card-header">
                <legend>{{ isEditing ? '修改問答' : '新增問答' }}</legend>
            </div>
                <form @submit.prevent="addUpdateQuiz" id="addDiscountform">
                    <div class="mb-3">
                        <label for="quizTopic" class="form-label">題目</label>
                        <input type="text" class="form-control" id="quizTopic" v-model="newQuestion.q_name">
                    </div>
                    <div class="mb-3">
                        <label for="quizOptionA" class="form-label">選項A</label>
                        <input type="text" class="form-control" id="quizOptionA" v-model="newQuestion.q_option_a">
                    </div>
                    <div class="mb-3">
                        <label for="quizOptionB" class="form-label">選項B</label>
                        <input type="text" class="form-control" id="quizOptionB" v-model="newQuestion.q_option_b">
                    </div>
                    <div class="mb-3">
                        <label for="quizAnswer" class="form-label">答案</label>
                        <select class="form-select" aria-label="Default select example" id="quizAnswer" v-model="newQuestion.q_ans">
                            <option selected >請選擇</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="submit" class="btn btn-primary col-6">{{ isEditing ? '儲存' : '新增' }}</button>
                    <button type="button" class="btn btn-secondary col-6" @click=closeForm()>{{ isEditing ? '確認' : '取消' }}</button>
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
            search:'',
            showAddUpdateForm: false, //新增or編輯視窗
            isEditing: false, //讓程式判斷是否為編輯模式的狀態
            question: [],
            newQuestion:[
                {
                q_no:'',
                q_name:'',
                q_option_a:'',
                q_option_b:'',
                q_ans:'',
                }
            ]
        }
    },
    computed: {
        filteredQuiz() {
            const searchTerm = this.search.toLowerCase();
            return this.question
                .filter(item =>
                    item.q_name.toLowerCase().includes(searchTerm) ||
                    item.q_option_a.toLowerCase().includes(searchTerm) ||
                    item.q_option_b.toLowerCase().includes(searchTerm) 
                )
        },
        paginatedQuiz() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredQuiz.slice(startIndex, startIndex + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredQuiz.length / this.itemsPerPage);
        }
    },
    methods: {
        setPage(page) {
            this.currentPage = page;
        },
        //刪除
        confirmDelete(item) {
            if (confirm(`確定要刪除問答編號 ${item.q_no} 嗎？`)) {
                this.deleteQuiz(item);
            }
        },
        deleteQuiz(item) {
            fetch(`${import.meta.env.VITE_API_URL}/quizManage/question_delete.php?q_no=${item.q_no}`, {
            method: 'GET'
            })
            .then(response => response.json())
            .then(result => {
                if (!result.error) {
                this.fetchQuizData();
                alert('題目刪除成功');
                } else {
                alert('刪除失敗: ' + result.msg);
                }
            })
            .catch(error => {
                console.error('刪除失敗:', error);
                alert('刪除失敗');
            });
        },
        //抓取資料庫資料
        fetchQuizData() {
            fetch(`${import.meta.env.VITE_API_URL}/quizManage/question_read.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                alert(data.msg)
            } else if (data.question) {
            this.question = data.question
            localStorage.setItem('question', JSON.stringify(this.question))
        }
        })
        },
        //新增視窗
        openAddForm() {
            this.showAddUpdateForm = true;
            this.isEditing = false;
        },
        //編輯視窗
        openEditForm(item) {
            this.showAddUpdateForm = true;
            this.isEditing = true;
            this.newQuestion = { ...item };
        },
        //關閉視窗
        closeForm() {
            this.showAddUpdateForm = false;
            this.isEditing = false;
            this.newQuestion = {};
        },
        //新增or修改
        addUpdateQuiz() {
        if (this.newQuestion.q_ans !== 'A' && this.newQuestion.q_ans !== 'B') {
            alert('請選擇答案');
            return;
        }
        let apiUrl = `${import.meta.env.VITE_API_URL}/quizManage/question_add.php`;
        if (this.isEditing) {
            apiUrl = `${import.meta.env.VITE_API_URL}/quizManage/question_update.php`;
        }

        let quizData = {
            q_name: this.newQuestion.q_name,
            q_option_a: this.newQuestion.q_option_a,
            q_option_b: this.newQuestion.q_option_b,
            q_ans: this.newQuestion.q_ans,
            q_no: this.newQuestion.q_no //有序號才能更新
        };

        fetch(apiUrl, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
        })
        .then(response => response.json())
        .then(result => {
            if (!result.error) {
            alert(this.isEditing ? '題目修改成功' : '題目新增成功');
            this.showAddUpdateForm = false;
            this.isEditing = false; //重置編輯狀態
            this.newQuestion = {
                q_name: '',
                q_option_a: '',
                q_option_b: '',
                q_ans: '',
                q_no:''
            };
            this.fetchQuizData();
            } else {
            alert(result.msg);
            }
        })
        .catch(error => {
            console.error('操作失敗:', error);
            alert('操作失敗: ' + error.message);
        });
        },
    },
    created(){
        this.fetchQuizData();
        // this.setDefaultTime();
    }
}
</script>