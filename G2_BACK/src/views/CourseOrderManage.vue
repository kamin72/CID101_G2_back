<template>
    <div class="container">
        <div class="row py-5">
            <h1 class="mb-4">課程訂單管理</h1>

            <div class="order-list">
                <div v-for="order in orders" :key="order.id" class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">訂單編號: {{ order.id }}</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>訂單日期:</strong> {{ order.date }}</p>
                                <p><strong>課程名稱:</strong> {{ order.courseName }}</p>
                                <p><strong>課程價格:</strong> NT. {{ order.coursePrice }}</p>
                                <p><strong>結帳金額:</strong> NT. {{ order.totalAmount }}</p>
                                <p><strong>訂單狀態:</strong> {{ order.orderStatus }}</p>
                                <p><strong>交易狀態:</strong> {{ order.transactionStatus }}</p>
                                <p><strong>報名人數:</strong> {{ order.participants }}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>訂購人:</strong> {{ order.customerName }}</p>
                                <p><strong>Email:</strong> {{ order.email }}</p>
                                <p><strong>電話號碼:</strong> {{ order.phone }}</p>
                                <p><strong>其他需求:</strong> {{ order.specialRequirements }}</p>
                            </div>
                        </div>
                        <div class="mt-3">
                            <label :for="'adminNotes-' + order.id" class="form-label"><strong>管理員備註:</strong></label>
                            <textarea v-model="order.adminNotes" class="form-control" :id="'adminNotes-' + order.id"
                                rows="3" placeholder="輸入管理員備註"></textarea>
                        </div>
                        <div class="mt-3 d-flex justify-content-between">
                            <button @click="cancelOrder(order.id)" class="btn btn-danger">取消訂單</button>
                            <div>
                                <button @click="saveChanges(order)" class="btn btn-primary me-2">儲存</button>
                                <button @click="discardChanges(order)" class="btn btn-secondary">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [
                {
                    id: "ORD001",
                    date: "2024-05-01",
                    courseName: "品酒初級課程1",
                    coursePrice: 3200,
                    totalAmount: 3200,
                    orderStatus: "已確認",
                    transactionStatus: "已付款",
                    participants: 1,
                    customerName: "張三",
                    email: "zhangsan@example.com",
                    phone: "0912345678",
                    specialRequirements: "無",
                    adminNotes: ""
                },
                // 可以添加更多訂單數據
            ],
            originalOrders: []
        };
    },
    created() {
        this.originalOrders = JSON.parse(JSON.stringify(this.orders));
    },
    methods: {
        cancelOrder(orderId) {
            if (confirm(`確定要取消訂單 ${orderId} 嗎？`)) {
                console.log(`正在取消訂單 ${orderId}`);
                // 這裡添加取消訂單的邏輯
            }
        },
        saveChanges(order) {
            console.log(`正在儲存訂單 ${order.id} 的更改`);
            // 這裡添加儲存更改的邏輯
            const index = this.originalOrders.findIndex(o => o.id === order.id);
            if (index !== -1) {
                this.originalOrders[index] = JSON.parse(JSON.stringify(order));
            }
        },
        discardChanges(order) {
            if (confirm('確定要放棄更改嗎？')) {
                const originalOrder = this.originalOrders.find(o => o.id === order.id);
                if (originalOrder) {
                    Object.assign(order, JSON.parse(JSON.stringify(originalOrder)));
                }
            }
        }
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