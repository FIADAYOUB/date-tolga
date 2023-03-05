<template lang="pug">
v-app
  v-app-bar(app :color="bgColor")
    v-app-bar-title Shopping
    v-spacer
    v-btn(class="text-none" icon stacked @click="showChartModal")
      v-badge(v-if="totalChart > 0" color="error" :content="totalChart" overlap)
        v-icon mdi-cart-outline
      v-icon(v-else) mdi-cart-outline

    v-btn(icon)
      v-icon mdi-account-circle
  Nuxt
  Home
  chart-modal
  Footer
</template>

<script>
import Footer from '../components/footer.vue';
import Home from '../components/home.vue';
import ChartModal from '../components/modal/chartModal.vue';
export default {
  name: 'IndexPage',
  components: {
    Home,
    Footer,
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

