<template>
  <Navigator />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import Navigator from '@/components/Navigator.vue'

export default {
  components: {
    RouterView,
    Navigator
  }
}
</script>
