<template lang="pug">
v-app
  Nuxt
  v-main
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
