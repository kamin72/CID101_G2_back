<template>
  <div class="container">
    <span class="fs-1 fw-bolder">詢價單管理</span>
    <div class="d-flex gap-3">
      <RouterLink to="/">
        <button
          type="button"
          class="btn btn-primary active"
          aria-pressed="true"
          data-bs-toggle="button"
        >
          詢價單查詢
        </button>
      </RouterLink>
      <RouterLink to="/addNew">
        <button type="button" class="btn btn-primary active" aria-pressed="true">詢價單統計</button>
      </RouterLink>
    </div>
    <OrderQuery />
    <OrderCount />
  </div>
</template>

<script>
import OrderQuery from '@/components/ordermanage/OrderQuery.vue'
import OrderCount from '@/components/ordermanage/OrderCount.vue'

export default {
  components: {
    OrderQuery,
    OrderCount
  },
  data() {
    return {}
  }
}
</script>
