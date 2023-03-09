<template lang="pug">
.index
  Home
</template>

<script>
import Home from '../components/home.vue';
export default {
  name: 'IndexPage',
  components: {
    Home
  },
  data: () => ({
    bgColor: 'white'
  }),
  created() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  computed: {
    changeColor() {
      return window.scrollY > 100 ? 'transparent' : 'white'
    }
  },
  methods: {
    handleScroll() {
      this.bgColor = window.scrollY > 60 ? 'transparent' : 'white'
    }
  }
}
</script>
<style lang="scss"></style>

