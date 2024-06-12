<template>
  <RouterView />
  <Test />
</template>

<script>
import { RouterView } from 'vue-router'
import Test from '@/components/Test.vue'
export default {
  components: {
    RouterView,
    Test,
  }
}
</script>
<style>
body {
  background-color: #ede7de;
}
</style>
