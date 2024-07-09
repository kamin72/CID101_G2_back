<template>
    <div style="width: 100%;" class="container">
        <div class="row py-5">
            <h1>課程管理</h1>
            <div class="button-wrap d-flex justify-content-between py-4">
                <div class="left-wrap d-flex justify-content-between">
                    <RouterLink to="/courseManage">
                        <button type="button" class="btn btn-primary me-1" style="height: 40px;">課程內容管理</button>
                    </RouterLink>
                    <button type="button" class="btn btn-secondary" style="height: 40px;">課程訂單管理</button>
                </div>
                <div class="right-wrap d-flex">
                    <div style="width: 320px;" class="input-group mb-3">
                        <input style="height: 40px;" type="text" class="form-control" placeholder="請輸入課程內容資訊"
                            aria-label="search-course-info" aria-describedby="button-search" v-model="searchTerm" />
                        <button class="btn btn-primary" type="button" id="button-search"
                            @click="searchOrders">搜尋</button>
                    </div>
                </div>
            </div>
            <table class="table align-middle">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">課程名稱</th>
                        <th scope="col">訂購人</th>
                        <th scope="col">人數</th>
                        <th scope="col">應付金額</th>
                        <th scope="col">實付金額</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col">交易狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.book_id">
                        <th scope="row">{{ order.book_id }}</th>
                        <td>{{ formatDate(order.book_date) }}</td>
                        <td>{{ order.book_course_name }}</td>
                        <td>{{ order.name }}</td>
                        <td>{{ order.book_amount }}</td>
                        <td>NT$ {{ order.book_payable_amount }}</td>
                        <td>NT$ {{ order.book_paid_amount }}</td>
                        <td>{{ order.book_order_status }}</td>
                        <td>{{ order.book_trading_status }}</td>
                        <td>
                            <button type="button" class="btn btn-primary d-flex align-items-center"
                                style="height: 40px;" @click="editOrder(order.book_id)">
                                <i class="material-symbols-outlined me-1">edit_square</i>
                                編輯
                            </button>
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
            orders: [],
            searchTerm: ''
        }
    },
    methods: {
        fetchOrders(search = '') {
            const xhr = new XMLHttpRequest();
            const url = `http://localhost/CID101_G2_php/back/courseOrderManage/getCourseOrder.php${search ? `?search=${encodeURIComponent(search)}` : ''}`;
            xhr.open('GET', url, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.error) {
                            console.error('Error fetching orders:', response.msg);
                        } else {
                            this.orders = response.orderItem || [];
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
        },
        editOrder(orderId) {
            console.log(`編輯訂單 ${orderId}`);
            const order = this.orders.find(o => o.book_id === orderId);
            if (order) {
                this.$router.push({
                    name: 'courseOrderManagePage',
                    query: {
                        id: orderId,
                        orderData: JSON.stringify(order)  // 將整個訂單對象傳遞
                    }
                });
            } else {
                console.error(`未找到 ID 為 ${orderId} 的訂單`);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('zh-TW');
        },
        searchOrders() {
            this.fetchOrders(this.searchTerm);
        },
    },
    mounted() {
        this.fetchOrders();
    },
}
</script>