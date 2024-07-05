<template>
  <Navigator />
  <keep-alive>
    <RouterView v-if="$route.meta.keepAlive" />
  </keep-alive>
  <RouterView v-if="!$route.meta.keepAlive" />
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


<!-- <template>
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
</script> -->
