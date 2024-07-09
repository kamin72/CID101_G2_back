<template>
    <div class="container">
        <div class="row py-5">
            <h1 class="mb-4">{{ isEditing ? '編輯課程訂單' : '新增課程訂單' }}</h1>

            <div v-if="order" class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">訂單編號: {{ order.book_id || '新訂單' }}</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>訂單日期:</strong> {{ formatDate(order.book_date) }}</p>
                            <p><strong>課程名稱:</strong> {{ order.book_course_name }}</p>
                            <p><strong>課程價格:</strong> NT$ {{ order.book_course_price }}</p>
                            <p><strong>結帳金額:</strong> NT$ {{ order.book_paid_amount }}</p>
                            <p><strong>訂單狀態:</strong> {{ order.book_order_status }}</p>
                            <p><strong>交易狀態:</strong> {{ order.book_trading_status }}</p>
                            <p><strong>報名人數:</strong> {{ order.book_amount }}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>訂購人:</strong> {{ order.name }}</p>
                            <p><strong>Email:</strong> {{ order.email }}</p>
                            <p><strong>電話號碼:</strong> 0{{ order.phone }}</p>
                            <p><strong>其他需求:</strong> {{ order.book_other_requirements }}</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label :for="'adminNotes-' + order.book_id" class="form-label"><strong>管理員備註:</strong></label>
                        <textarea v-model="order.book_remark" class="form-control" :id="'adminNotes-' + order.book_id"
                            rows="3" placeholder="輸入管理員備註"></textarea>
                    </div>
                    <div class="mt-3 d-flex justify-content-between">
                        <button @click="cancelOrder" class="btn btn-danger" v-if="isEditing">取消訂單</button>
                        <div>
                            <button @click="saveChanges" class="btn btn-primary me-2">儲存</button>
                            <button @click="discardChanges" class="btn btn-secondary">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            order: null,
            originalOrder: null,
            isEditing: false
        };
    },
    methods: {
        fetchOrder() {
            const id = this.$route.query.id;
            const orderData = this.$route.query.orderData;

            if (id && orderData) {
                this.isEditing = true;
                // 使用從路由查詢參數傳遞的訂單數據
                this.order = JSON.parse(orderData);
                this.originalOrder = JSON.parse(JSON.stringify(this.order));
            } else if (id) {
                // 如果只有 id 而沒有訂單數據，則從服務器獲取
                this.isEditing = true;
                // 發送 AJAX 請求獲取訂單數據
                const xhr = new XMLHttpRequest();
                const url = `http://localhost/CID101_G2_php/back/courseOrderManage/getCourseOrder.php?book_id=${id}`;
                xhr.open('GET', url, true);
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.error) {
                                console.error('Error fetching order:', response.msg);
                            } else {
                                this.order = response.orderItem[0] || null;
                                this.originalOrder = JSON.parse(JSON.stringify(this.order));
                            }
                        } catch (e) {
                            console.error('Error parsing JSON:', e);
                        }
                    } else {
                        console.error('HTTP error', xhr.status, xhr.statusText);
                    }
                };
                xhr.onerror = () => {
                    console.error('Network error');
                };
                xhr.send();
            } else {
                // 初始化新訂單
                this.order = {
                    book_id: null,
                    book_date: new Date().toISOString().split('T')[0],
                    book_course_name: '',
                    book_course_price: 0,
                    book_paid_amount: 0,
                    book_order_status: '已完成',
                    book_trading_status: '已付款',
                    book_amount: 1,
                    name: '',
                    email: '',
                    phone: '',
                    book_other_requirements: '',
                    book_remark: ''
                };
                this.originalOrder = JSON.parse(JSON.stringify(this.order));
            }
            console.log(this.order)
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('zh-TW');
        },
        cancelOrder() {
            if (confirm(`確定要取消訂單 ${this.order.book_id} 嗎？`)) {
                console.log(`正在取消訂單 ${this.order.book_id}`);
                // 這裡添加取消訂單的邏輯
                // 可能需要發送 AJAX 請求到服務器
            }
        },
        saveChanges() {
            // 這裡添加儲存更改的邏輯
            // 需要發送 AJAX 請求到服務器
            // 如果是新訂單，可能需要使用 POST 請求；如果是編輯現有訂單，可能需要使用 PUT 請求
            const remark = this.order.book_remark;
            console.log(`發送訂單 ${this.order.book_id} 的備註為 ${remark}`);

        },
        discardChanges() {
            if (confirm('確定要放棄更改嗎？')) {
                this.order = JSON.parse(JSON.stringify(this.originalOrder));
            }
        },
    },
    mounted() {
        this.fetchOrder();
    }
};
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
    color: #007bff;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

h1 {
    color: #333;
    padding-bottom: 10px;
}
</style>