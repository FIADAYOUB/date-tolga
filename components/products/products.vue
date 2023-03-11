<script>
import ProductCard from './productCard.vue'
import _ from "lodash"
export default {
  name: "Products",
  props: {
    // products: {type: Array, default: [], required: false}
  },
  components: { ProductCard },
  data: () => ({
    products: [],
    loading: true,
    pages: {
      limit: 12,
      skip: 1,
      total: 0
    },
    model: 0,
    grid: true,
    searchValue: null
  }),
  watch: {
    pages: {
      handler(newValue) {
        if (!this.searchValue) {
          this.fetchData()
        }
      },
      deep: true
    },
    '$store.state.products.selectedCategory': {
      handler(newValue) {
        this.fetchData()
      },
      deep: true
    },
    searchValue: {
      immediate: false,
      handler: _.debounce(function (val, oldVal) {
        this.searchItem(val)
      }, 1000),
    },
  },
  created() {
    this.fetchData();
  },
  computed: {
    getSkip() {
      return this.pages.skip === 1 ? 0 : (this.pages.skip - 1) * this.pages.limit
    },
    getLength() {
      const a = this.pages.total % this.pages.limit
      const b = this.pages.total % this.pages.limit === 1 ? 1 : 0
      return Math.floor(this.pages.total / this.pages.limit) + b
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      const urlCat = 'https://dummyjson.com/products/category/' + this.$store.state.products.selectedCategory
      const urlAllData = 'https://dummyjson.com/products'
        + '?limit=' + this.pages.limit + '&skip=' + this.getSkip
      const urlToGo = this.$store.state.products.selectedCategory ? urlCat : urlAllData
      fetch(urlToGo, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          this.products = response.products;
          this.pages.total = response.total
          this.loading = false;
        })
    },
    searchItem(val) {
      this.loading = true
      fetch('https://dummyjson.com/products/search?q=' + val)
        .then(res => res.json())
        .then(res => {
          this.products = res.products;
          this.pages.total = res.total
          this.loading = false;
        });
    }
  }
}
</script>
<template lang="pug">
.products-index.secondary
  .select_wrapper.d-flex.align-center.justify-space-between.mb-3
    .list-order-center
      v-row(class="ml-5")
        v-col(cols="12")
          v-btn(@click="grid=!grid" :class="{'bg-primary': grid}" icon)
            v-icon(size="38px") mdi-apps
          v-btn(@click="grid=!grid" :class="{'bg-primary': !grid}" icon)
            v-icon(size="45px") mdi-view-list
    .search.mx-3
      v-text-field(v-model='searchValue' prepend-icon="mdi-magnify" single-line  placeholder="search...")
  .products-wrapper
    template(v-if="loading")
      v-row()
        v-col(cols="12")
          v-row(v-show="grid")
            v-col(v-for="(item, i) in pages.limit" :key="i" cols="12" lg="3" sm="6" xs="12" md="4")
              v-skeleton-loader(
                class="mx-auto px-3"
                max-width="300"
                type="card")
    template(v-else)
      v-row()
        v-col(cols="12")
          v-row(v-show="grid" dense)
            v-col(v-for="(product, i) in products" :key="i" cols="12" lg="3" sm="6" xs="12" md="4")
              product-card(:product="product" :grid="true")
          v-row(v-show="!grid" v-for="(product, i) in products" :key="i" class="mx-2" dense)
            product-card(:product="product",  :grid="false")
  v-pagination(v-if="pages.total > pages.limit" v-model="pages.skip" class="mt-4" :length="getLength" :total-visible="5")
</template>
<style lang="sass">
.products-index
  padding: 20px 0px
  margin: 0 auto
  .select_wrapper
    .bg-primary
      color: var(--primary-color)
  .products-wrapper
    .v-card
      margin: 0 8px !important
      height: 300px
      .card-title
        font-size: 14px
        height: 60px
        white-space: pre-wrap
        word-break: break-word
        line-height: 1.5rem
        text-align: justify
      .v-card__subtitle
        padding: 0px
        overflow: auto
        margin: 0px
    .v-rating
      .v-icon
        padding: 0px
</style>