<template lang="pug">
.index
  Home
  chart-modal
</template>

<script>
import Home from '../components/home.vue';
import ChartModal from '../components/modal/chartModal.vue';
export default {
  name: 'IndexPage',
  components: {
    Home,
    ChartModal
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
    totalChart() {
      return this.$store.state.products.itemsInChart.length
    },
    changeColor() {
      return window.scrollY > 100 ? 'transparent' : 'white'
    }
  },
  methods: {
    handleScroll() {
      this.bgColor = window.scrollY > 60 ? 'transparent' : 'white'
    },
    showChartModal() {
      this.$store.commit('app/setShowChartModal', true)
    }
  }
}
</script>
<style lang="scss"></style>

