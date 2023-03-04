<template lang="pug">
.product-page
  v-app
    .product-info(v-if="!loading")
      .image__wrapper
        v-carousel(v-model="model" hide-delimiters)
          v-carousel-item(v-for="img in product.images" :src="img" cover height="200px")
      .infos(class="mx-3")
        v-chip(v-if="product.stock < deal" label color="info") Top Deal
        h3 {{ product.title }}
        div(class="d-flex ")
          v-rating(v-model="product.rating" color="yellow" half-increments readonly)
          div(class="ml-3")  {{ product.rating }}
        div {{ product.description }}
        div(class="d-flex mt-2 mx-auto")
          div
            div.promo Save {{ product.discountPercentage }} %
            div {{ product.price - (product.price * (product.discountPercentage / 100)) }} $
          v-divider(vertical class="mx-3" color="primary")
          div
            div Old price
            div  {{ product.price }} $
        div(class="my-2") {{ product.stock }} In stock
</template>
<script>
export default {
  name: "product-id",
  data: () => ({
    deal: 100,
    model: 0,
    product: null,
    loading: true
  }),
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const url = 'https://dummyjson.com/products/' + this.$route.query.id
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          this.product = response;
          this.loading = false;
        })
    }
  }
}
</script>
<style lang="sass">
.product-page
  .product-info
    display: flex
    padding: 180px calc(5% + 20px) 50px
    .image__wrapper
      width: 50%
      .v-carousel
        height: 300px !important
        .v-carousel__item
          height: 250px !important
  .infos
    .promo
      color: red
    .v-rating
      .v-icon
        padding: 0px


</style>
