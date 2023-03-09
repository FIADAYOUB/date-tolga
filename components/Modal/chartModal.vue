<template lang="pug">
.modal(v-if="isShow")
  div(class="modal-content")
    div(class="modal-header")
      h3 Shopping list
      v-btn(icon class="close" @click="close()")
        v-icon mdi-close
    div(class="modal-body")
      v-card(v-for="(product, index) in productsChart" :key="index" class="my-2 my-2")
        v-card-title {{ product.title }}
        v-card-subtitle(class="d-flex justify-space-between px-3")
          div(class="mx-3") {{ product.price }} $
          div
          v-btn(icon class="close" @click="increment(product)")
            v-icon mdi-plus
          div {{ product.count }}
          v-btn(icon class="close" @click="decrement(product)")
            v-icon mdi-minus
</template>

<script>

export default {
  name: "Modal",
  props: {
  },
  methods: {
    close() {
      this.$store.commit('app/setShowChartModal', false)
    },
    increment(item) {
      this.$store.commit('products/addItemTochart', item)
    },
    decrement(item) {
      this.$store.commit('products/removeFromChart', item)
    }
  },
  computed: {
    isShow() {
      return this.$store.state.app.showChartModal
    },
    productsChart() {
      return this.$store.state.products.itemsInChart
    },
    totalInChart(item) {
      return this.$store.state.products.itemsInChart.filter((v) => (v.id === item.id)).length
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  width: 50%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close {
  font-size: 25px;
  color: #aaa;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
