<template lang="pug">
v-app
  v-app-bar(:elevation="2" rounded density="compact")
    v-toolbar-title Shopping
    v-spacer
    v-btn(icon)
      v-icon mdi-cart-outline
    v-btn(icon)
      v-icon mdi-account-circle
  Nuxt
  Home
  Footer
</template>

<script>
import Footer from '../components/footer.vue';
import Home from '../components/home.vue';
export default {
  name: 'IndexPage',
  components: {
    Home,
    Footer
  }
}
</script>
<style lang="scss">
</style>
