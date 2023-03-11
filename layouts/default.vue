<template lang="pug">
v-app
  v-app-bar
    v-app-bar-title
      nuxt-link(to="/")
        v-icon mdi-home
    v-spacer
    v-btn(class="text-none" icon stacked @click="showChartModal")
      v-badge(v-if="totalChart > 0" color="error" :content="totalChart" overlap)
        v-icon mdi-cart-outline
      v-icon(v-else) mdi-cart-outline

    v-btn(icon)
      v-icon mdi-account-circle
  Nuxt
  chart-modal
  Footer
</template>

<script>
import ChartModal from '../components/modal/chartModal.vue';
import Footer from '../components/footer.vue';
export default {
  name: 'IndexPage',
  components: {
    Footer,
    ChartModal
  },
  data: () => ({
    bgColor: 'white'
  }),
  created() {
  },
  computed: {
    totalChart() {
      return this.$store.state.products.itemsInChart.length
    },
    totalChart() {
      return this.$store.state.products.itemsInChart.length
    }
  },
  methods: {
    showChartModal() {
      this.$store.commit('app/setShowChartModal', true)
    }
  }
}
</script>
<style lang="sass">
.v-application
   font-family: Red Hat Text,sans-serif
</style>

