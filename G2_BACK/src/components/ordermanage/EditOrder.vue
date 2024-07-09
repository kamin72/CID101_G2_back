<template>
  <div class="container">
    <p class="fs-1 fw-bolder border-bottom border-2">詢價單資訊</p>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">建立日期</p>
      <p>{{ memberOrderInfo?.build_date }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">更新日期</p>
      <p>{{ memberOrderInfo.up_date }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">詢價單編號</p>
      <p>{{ memberOrderInfo.cart_id }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">姓名</p>
      <p>{{ memberOrderInfo.cart_name }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">電話</p>
      <p>{{ memberOrderInfo.phone }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">email</p>
      <p>{{ memberOrderInfo.email }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">總金額</p>
      <p>$ {{ memberOrderInfo.cart_paidamount }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">詢價單狀態</p>
      <p>{{ getCartStatus(localCartStatus || memberOrderInfo.cart_status) }}</p>
    </div>
    <table class="table mt-5 table-borderless">
      <thead>
        <tr class="table-primary">
          <th scope="col">商品名稱</th>
          <th scope="col">單價</th>
          <th scope="col">數量</th>
          <th scope="col">總金額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderItem" :key="item.cart_id" class="border-bottom">
          <th scope="row">{{ item.prod_name }}</th>
          <td>$ {{ item.price }}</td>
          <td>{{ item.amount }}</td>
          <td>$ {{ item.price * item.amount }}</td>
        </tr>
        <tr>
          <th>總價</th>
          <td></td>
          <td></td>
          <td>$ {{ total }}</td>
        </tr>
        <tr class="border-bottom">
          <th>折扣</th>
          <td></td>
          <td></td>
          <td>- $ {{ memberOrderInfo.cart_discount }}</td>
        </tr>
        <tr>
          <th>應付金額</th>
          <td></td>
          <td></td>
          <td>$ {{ actualPaid }}</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex">
      <p class="mb-0 w-25 fw-bolder">訂單處理狀態</p>
      <select
        class="form-select w-25"
        aria-label="Default select example"
        @change="updateOrderstatus($event)"
      >
        <option selected>訂單狀態</option>
        <option value="0">未處理</option>
        <option value="1">處理中</option>
        <option value="2">已備貨</option>
        <option value="3">已取件</option>
        <option value="4">請求取消</option>
        <option value="5">已取消</option>
      </select>
      <button class="ms-5 btn btn-outline-primary" type="button" @click="deleteOrder">
        取消訂單
      </button>
    </div>
    <div class="d-flex mt-4">
      <p class="mb-0 w-25 fw-bolder">備貨完成通知</p>
      <button class="ms-5 btn btn-outline-primary" type="button">發送信件</button>
    </div>
    <div class="mt-5 mb-5 h-25 text-center" style="width: 100%">
      <router-link
        to="/orderManage/orderquery"
        type="button"
        class="btn btn-primary fs-4"
        style="width: 30%"
      >
        儲存
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cartId'],
  data() {
    return {
      orderData: [],
      orderItem: [],
      localCartStatus: null
    }
  },
  methods: {
    fetchOrderData() {
      const selectValue = 0
      fetch(
        `${import.meta.env.VITE_API_URL}/back/orderManage/orderManage.php?identity=${selectValue}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.order == null) {
            alert(data.msg)
          } else {
            this.orderData = data.order
            // console.log(this.orderData)
          }
        })
    },
    getCartStatus(status) {
      const statusMap = {
        0: '未處理',
        1: '處理中',
        2: '已備貨',
        3: '已取件',
        4: '請求取消',
        5: '已取消'
      }
      return statusMap[status] || '未知狀態'
    },
    getMemberOrderItem() {
      const id = this.cartId
      const url = `${import.meta.env.VITE_API_URL}/orderManage/getMemberOrderItem.php?cart_id=${id}`
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.orderItem) {
            this.orderItem = data.orderItem
            // console.log(this.orderItem)
          }
        })
    },
    updateOrderstatus(event) {
      const id = this.cartId
      const statusValue = event.target.value
      fetch(
        `${import.meta.env.VITE_API_URL}/orderManage/updateOrderstatus.php?cart_ststus=${statusValue}&cart_id=${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else {
            alert('訂單狀態修改成功')
            this.localCartStatus = statusValue // 更新本地狀態
          }
        })
    },
    deleteOrder() {
      const id = this.cartId
      fetch(`${import.meta.env.VITE_API_URL}/orderManage/deletOrder.php?&cart_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else {
            if (confirm('確定要取消此訂單嗎？')) {
              alert(data.msg)
              this.$router.push('/orderManage/orderquery')
            }
          }
        })
    },
    handleOrderStatus() {
      if (this.memberOrderInfo.cart_status !== this.localCartStatus) {
        this.localCartStatus = this.memberOrderInfo.cart_status
      }
    }
  },
  computed: {
    memberOrderInfo() {
      // return this.orderData[this.cartId - 1] || []
      return this.orderData.find((data) => data.cart_id == parseInt(this.cartId)) || []
    },
    total() {
      const totalPrice = this.orderItem.reduce((total, item) => total + item.price * item.amount, 0)
      return totalPrice
    },
    actualPaid() {
      return this.total - this.memberOrderInfo.cart_discount
    }
  },
  mounted() {
    this.getMemberOrderItem()
    this.fetchOrderData()
    this.handleOrderStatus()
  },
  watch: {
    // memberOrderInfo: {
    //   handle(newValue) {
    //     if (newValue.cart_status !== this.localCartStatus) {
    //       this.localCartStatus = newValue.cart_status
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>
