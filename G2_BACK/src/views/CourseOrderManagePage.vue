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
                            <button @click.prevent="saveChanges" class="btn btn-primary me-2">儲存</button>
                            <button @click.prevent="goBack" class="btn btn-secondary">取消</button>
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
                const url = `${import.meta.env.VITE_API_URL}/courseOrderManage/getCourseOrder.php?book_id=${id}`;
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
            if (confirm(`確定要取消訂單 ${this.order.book_id} 嗎？此操作不可逆。`)) {
                console.log(`正在取消訂單 ${this.order.book_id}`);

                const xhr = new XMLHttpRequest();
                const url = `${import.meta.env.VITE_API_URL}/courseOrderManage/cancelOrder.php`;

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.success) {
                                alert('訂單已成功取消！');
                                this.$router.push({
                                    name: 'courseOrderManage',
                                    query: { refresh: 'true' }
                                });
                            } else {
                                alert('取消訂單失敗：' + response.message);
                            }
                        } catch (e) {
                            console.error('解析響應時出錯：', e);
                            alert('取消訂單過程中發生錯誤，請稍後再試。');
                        }
                    } else {
                        console.error('HTTP 錯誤', xhr.status, xhr.statusText);
                        alert('取消訂單失敗，請檢查網絡連接並稍後再試。');
                    }
                };

                xhr.onerror = () => {
                    console.error('網絡錯誤');
                    alert('網絡錯誤，請檢查您的網絡連接。');
                };

                const data = `book_id=${encodeURIComponent(this.order.book_id)}`;
                xhr.send(data);
            }
        },

        saveChanges() {
            const remark = this.order.book_remark;
            console.log(`準備發送訂單 ${this.order.book_id} 的備註：${remark}`);

            // 創建 XMLHttpRequest 對象
            const xhr = new XMLHttpRequest();
            const url = `${import.meta.env.VITE_API_URL}/courseOrderManage/updateOrderRemark.php`;

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            alert('備註更新成功！');
                            // 更新原始數據
                            this.originalOrder.book_remark = this.order.book_remark;
                            // 使用路由導航回課程管理頁面，並帶上 refresh 參數
                            this.$router.push({
                                path: '/courseManage',
                                query: { refresh: Date.now() } // 使用當前時間戳確保每次都是不同的值
                            });
                        } else {
                            alert('更新失敗：' + response.message);
                        }
                    } catch (e) {
                        console.error('解析響應時出錯：', e);
                        alert('更新過程中發生錯誤，請稍後再試。');
                    }
                } else {
                    console.error('HTTP 錯誤', xhr.status, xhr.statusText);
                    alert('更新失敗，請檢查網絡連接並稍後再試。');
                }
            };

            xhr.onerror = () => {
                console.error('網絡錯誤');
                alert('網絡錯誤，請檢查您的網絡連接。');
            };

            // 準備要發送的數據
            const data = `book_id=${encodeURIComponent(this.order.book_id)}&remark=${encodeURIComponent(remark)}`;

            // 發送請求
            xhr.send(data);
        },

        goBack() {
            if (this.isEditing && !this.hasNoChanges()) {
                if (confirm('您有未保存的更改。確定要放棄這些更改嗎？')) {
                    this.$router.go(-1);
                }
            } else {
                this.$router.go(-1);
            }
        },

        hasNoChanges() {
            return JSON.stringify(this.order) === JSON.stringify(this.originalOrder);
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