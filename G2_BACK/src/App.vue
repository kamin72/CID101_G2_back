<template>
  <RouterView />
  <div>123</div>
  <TestView />
</template>

<script>
import { RouterView } from 'vue-router'
import TestView from '@/components/TestView.vue'

export default {
  components: {
    RouterView,
    TestView
  }
}
</script>
