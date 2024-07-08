<template>
    <div style="width: 100%;" class="container">
        <div class="row py-5">
            <h1>優惠券管理</h1>
            <div class="button-wrap d-flex justify-content-between py-4">
                <div class="left-wrap d-flex justify-content-between">
                    <button type="button" class="btn me-1" :class="{'btn-primary': showActive, 'btn-secondary': !showActive}"style="height: 40px;"@click="showActive = true" >可使用</button>
                    <button type="button" class="btn" :class="{'btn-primary': !showActive, 'btn-secondary': showActive}"  style="height: 40px;"@click="showActive = false">已過期</button>
                </div>
                <div class="right-wrap d-flex">
                        <div class="input-group mb-3 me-2" style="width: 320px;">
                        <span class="input-group-text" id="basic-addon1">搜尋</span>
                        <input style="height: 40px;" type="text" class="form-control" placeholder="請輸入優惠券名稱" aria-label="Username" aria-describedby="basic-addon1" v-model="search"/>
                        </div>
                        <button type="button" class="btn btn-primary" style="height: 40px;" @click="openAddForm">新增</button>
                </div>
                

            </div>
            <table class="table align-middle">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">優惠券編號</th>
                        <th scope="col">優惠券名稱</th>
                        <th scope="col">折扣金額</th>
                        <th scope="col">使用期限</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredDiscounts" :key="item.dis_serial">
                        <th scope="row">{{ item.dis_serial }}</th>
                        <td>{{ item.dis_name }}</td>
                        <td>{{ item.dis_amount }}</td>
                        <td>{{ item.dis_set_date }}</td>
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
        </div>
    </div>
    <!-- 遮罩 -->
    <div v-if="showAddUpdateForm" class="overlay z-2" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;background-color: rgba(0, 0, 0, 0.5);"></div>
    <!-- 新增優惠券的 Lightbox -->
    <div  v-if="showAddUpdateForm" class="mb-3 z-3" style="width: 500px;padding: 20px; border: 1px black solid; border-radius: 10px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white;">
            <div class="card-header">
                <legend>{{ isEditing ? '修改優惠券' : '新增優惠券' }}</legend>
            </div>
                <form @submit.prevent="addUpdateDiscount" id="addDiscountform">
                    <div class="mb-3">
                        <label for="discountName" class="form-label">優惠券名稱</label>
                        <input type="text" class="form-control" id="disconutName" v-model="newDiscount.dis_name">
                    </div>
                    <div class="mb-3">
                        <label for="discountAmount" class="form-label">折扣金額</label>
                        <input type="number" class="form-control" id="discountAmount" v-model="newDiscount.dis_amount">
                    </div>
                    <div class="mb-3">
                        <label for="discountTime" class="form-label">使用期限</label>
                        <input type="datetime-local" step="1" class="form-control" id="discountTime" v-model="newDiscount.dis_set_date">
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
            search:'',
            showActive: true, //可使用or已過期
            showAddUpdateForm: false, //新增or編輯視窗
            isEditing: false, //讓程式判斷是否為編輯模式的狀態
            discount: [],
            newDiscount:[
                {
                dis_name:'',
                dis_amount:'',
                dis_set_date:''
                }
            ]
        }
    },
    computed: {
        //判斷優惠券是否已過期，並透過可使用/已過期按鈕來分類顯示
        filteredDiscounts() {
            const now = new Date();
            const search = this.search.toLowerCase();
            
            return this.discount.filter(item => {
            // 判断是否符合搜索条件
            const matchSearch = item.dis_name.toLowerCase().includes(search) || String(item.dis_amount).includes(search);

            // 判断是否符合可使用或已过期条件
            const discountDate = new Date(item.dis_set_date);
            const isFuture = discountDate >= now;

            if (this.showActive) {
                return isFuture && matchSearch;
            } else {
                return !isFuture && matchSearch;
            }
            });
        }
    },
    methods: {
        //刪除
        confirmDelete(item) {
            if (confirm(`確定要刪除優惠券序號 ${item.dis_serial} 嗎？`)) {
                this.deleteDiscount(item);
            }
        },
        deleteDiscount(item) {
            fetch(`http://localhost/CID101_G2/CID101_G2_php/back/discountManage/discountType_delete.php?dis_serial=${item.dis_serial}`, {
            method: 'GET'
            })
            .then(response => response.json())
            .then(result => {
                if (!result.error) {
                this.fetchDiscountData();
                alert('優惠券刪除成功');
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
        fetchDiscountData() {
            fetch('http://localhost/CID101_G2/CID101_G2_php/back/discountManage/discountType_read.php')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                alert(data.msg)
            } else if (data.discount) {
            this.discount = data.discount
            localStorage.setItem('discount', JSON.stringify(this.discount))
        }
        })
        },
        //新增視窗
        openAddForm() {
            this.showAddUpdateForm = true;
            this.isEditing = false;
            this.setDefaultTime();
        },
        //編輯視窗
        openEditForm(item) {
            this.showAddUpdateForm = true;
            this.isEditing = true;
            this.newDiscount = { ...item };
        },
        //關閉視窗
        closeForm() {
            this.showAddUpdateForm = false;
            this.isEditing = false;
            this.newDiscount = {};
        },
        //新增優惠券視窗時，日期時間預設為當月最後一天23:59:59
        setDefaultTime() {
            const now = new Date();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);
            //計算偏差時間,+8時區為 -480(分)
            const currentTimezoneOffset = endOfMonth.getTimezoneOffset();
            //'-'-480=+480
            endOfMonth.setMinutes(endOfMonth.getMinutes() - currentTimezoneOffset);
            this.newDiscount.dis_set_date = endOfMonth.toISOString().slice(0, 19);
        },
        //新增or修改優惠券
        addUpdateDiscount() {
        let apiUrl = 'http://localhost/CID101_G2/CID101_G2_php/back/discountManage/discountType_add.php';
        if (this.isEditing) {
            apiUrl = 'http://localhost/CID101_G2/CID101_G2_php/back/discountManage/discountType_update.php';
        }

        let disData = {
            dis_name: this.newDiscount.dis_name,
            dis_amount: parseInt(this.newDiscount.dis_amount),
            dis_set_date: this.newDiscount.dis_set_date,
            dis_serial: this.newDiscount.dis_serial //有序號才能更新
        };

        fetch(apiUrl, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(disData)
        })
        .then(response => response.json())
        .then(result => {
            if (!result.error) {
            alert(this.isEditing ? '優惠券修改成功' : '優惠券新增成功');
            this.showAddUpdateForm = false;
            this.isEditing = false; //重置編輯狀態
            this.newDiscount = {
                dis_name: '',
                dis_amount: '',
                dis_set_date: '',
                dis_serial: ''
            };
            this.fetchDiscountData();
            } else {
            alert('操作失敗: ' + result.msg);
            }
        })
        .catch(error => {
            console.error('操作失敗:', error);
            alert('操作失敗');
        });
        },
    },
    created(){
        this.fetchDiscountData();
        this.setDefaultTime();
    }
}
</script>