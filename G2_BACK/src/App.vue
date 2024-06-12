<template>
  <TestView />
  <RouterView />
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
