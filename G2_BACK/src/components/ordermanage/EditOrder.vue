<template>
  <div class="container">
    <p class="fs-1 fw-bolder border-bottom border-2">詢價單資訊</p>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">建立日期</p>
      <p>{{ memberOrderInfo.build_date }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">更新日期</p>
      <p>{{ memberOrderInfo.up_date }}</p>
    </div>
    <div class="d-flex border-bottom mb-1">
      <p class="me-5 w-25 fw-bolder">詢價單編號</p>
      <p>{{ memberOrderInfo.no }}</p>
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
      <p>{{ getCartStatus(memberOrderInfo.cart_status) }}</p>
    </div>
    <table class="table mt-5">
      <thead>
        <tr class="table-primary">
          <th scope="col">商品名稱</th>
          <th scope="col">單價</th>
          <th scope="col">數量</th>
          <th scope="col">總金額</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="item in orderData" :key="item.cart_id">
          <th scope="row">{{ item.cart_id }}</th>
          <td>{{ item.cart_name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.email }}</td>
          <td class="d-flex gap-2 justify-content-center"></td>
        </tr> -->
      </tbody>
    </table>

    <div class="d-flex">
      <p class="mb-0 w-25 fw-bolder">訂單處理狀態</p>
      <select class="form-select w-25" aria-label="Default select example">
        <option value="">未處理</option>
        <option value="">處理中</option>
        <option value="">已備貨</option>
        <option value="">已取件</option>
        <option value="">請求取消</option>
        <option value="">已取消</option>
      </select>
      <button class="ms-5 btn btn-outline-primary" type="button">取消訂單</button>
    </div>
    <div class="d-flex mt-4">
      <p class="mb-0 w-25 fw-bolder">備貨完成通知</p>
      <button class="ms-5 btn btn-outline-primary" type="button">發送信件</button>
    </div>
    <div class="mt-5 d-flex gap-5 h-25" style="width: 100%">
      <button type="button" class="btn btn-primary p-2 fs-4" style="width: 50%">儲存</button>
      <button type="button" class="btn btn-secondary fs-4" style="width: 50%">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cartId'],
  data() {
    return {
      orderData: []
    }
  },
  methods: {
    // fetchOrderData() {
    //   fetch(`http://localhost/CID101_G2_php/back/orderManage/orderManage.php}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.error) {
    //         alert(data.msg)
    //       } else {
    //         this.orderData = data.order
    //         console.log(this.orderData)
    //       }
    //     })
    // },
    getMemberOrder() {
      let storage = localStorage.getItem('orderData')
      if (storage) {
        storage = JSON.parse(storage)
        this.orderData = storage
        // console.log(this.orderData)
      }
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
    }
  },
  computed: {
    memberOrderInfo() {
      return this.orderData[this.cartId - 1] || []
    }
  },
  mounted() {
    this.getMemberOrder()
    console.log(this.memberOrderInfo)
    // console.log(this.orderData)
    // console.log(this.cartId)
  }
}
</script>
