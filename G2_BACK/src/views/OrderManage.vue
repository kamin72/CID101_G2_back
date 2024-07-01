<template>
  <div class="container">
    <span class="fs-1 fw-bolder">詢價單管理</span>
    <div class="d-flex gap-3">
      <RouterLink to="/orderManage/orderquery">
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: isActive }"
          @click="toggleActive"
        >
          詢價單查詢
        </button>
      </RouterLink>
      <RouterLink to="/orderManage/ordercount">
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: !isActive }"
          @click="toggleActive"
        >
          詢價單統計
        </button>
      </RouterLink>
    </div>
    <OrderQuery v-if="$route.path === '/orderManage/orderquery'" />
    <OrderCount v-if="$route.path === '/orderManage/ordercount'" />
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
    return {
      isActive: false
    }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
    }
  }
}
</script>
