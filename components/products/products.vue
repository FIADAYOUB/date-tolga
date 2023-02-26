<script>
export default {
  name:"Products",
  props: {
    // products: {type: Array, default: [], required: false}
  },
  data: () => ({
    products: [],
    loading: true,
    pages: {
      limit:9,
      skip:1,
      total:0
    },
    model: 0
  }),
  watch: {
    pages: {
      handler(newValue) {
        this.fetchData()
      },
      deep: true
    },
    '$store.state.products.selectedCategory': {
      handler(newValue) {
        this.fetchData()
      },
      deep: true
    }
  },
  created () {
    this.fetchData();
  },
  computed: {
    getSkip () {
      return this.pages.skip === 1 ? 0 : (this.pages.skip - 1) * this.pages.limit
    },
    getLength () {
      const a = this.pages.total % this.pages.limit
      const b = this.pages.total % this.pages.limit === 1 ? 1 : 0
      return  Math.floor(this.pages.total/this.pages.limit) + b
    }
  },
  methods: {
    fetchData () {
      const urlCat = 'https://dummyjson.com/products/category/'+ this.$store.state.products.selectedCategory
      const urlAllData = 'https://dummyjson.com/products'
                  +'?limit='+this.pages.limit+'&skip='+ this.getSkip
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
    }
  }
}
</script>
<template lang="pug">
.products-index
  .products-wrapper
    template(v-if="loading")
      div(v-for="item in pages.limit")
        v-skeleton-loader(
          class="mx-auto"
          max-width="250"
          type="card")
    template(v-else)
      div(v-for="item in products")
        v-card.grid-container
          v-img(
            class="align-end text-white"
            height="150"
            :src='item.images[0]'
            cover)
          v-card-title.card-title {{ item.title }}
          v-card-subtitle(class="d-flex justify-space-between")
            div {{ item.price }} $
            v-rating(
              v-model="item.rating"
              color="yellow"
              half-increments
              readonly)
          v-card-actions(class="justify-center")
            v-btn Details
  v-pagination(v-if="pages.total > pages.limit" v-model="pages.skip" class="mt-4" :length="getLength" :total-visible="5")
</template>
<style>
.products-index{
  background-color: white;
  padding: 20px 0px;
  margin: 0 auto;
}
.products-wrapper {
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: auto;
  grid-gap: 2em;
}
.grid-container {
  margin: auto;
  height: 300px;
}
.card-title {
  font-size: 14px;
  height: 80px;
  white-space:pre-wrap;
  word-break:break-word;
  line-height: 1.5rem;
  text-align: justify;
}
.v-card__subtitle {
  padding-bottom: 0px;
}
.v-rating .v-icon {
  padding: 0px;
}
</style>