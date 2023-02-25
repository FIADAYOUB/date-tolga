<script>
export default {
  name:"Products",
  props: {
    // products: {type: Array, default: [], required: false}
  },
  data: () => ({
    products: [],
    loading: true
  }),
  created () {
    this.fetchData();
  },
  methods: {
    fetchData () {
      const url = 'https://dummyjson.com/products/?limit=8'
      fetch(url, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          },
      })
        .then(response => response.json())
        .then(response => {
          this.products = response.products;
          this.loading = false;
        })
    }
  }
}
</script>
<template lang="pug">
.products-index
  template(v-if="loading")
    div(v-for="item in 8")
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
</template>
<style>
.products-index {
  background-color: white;
  height: fit-content;
  margin: 0 auto 200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: auto;
  justify-content: center;
  grid-gap: 2em;
  padding: 20px 0px;
}
.grid-container {
  margin: auto;
  height: 300px;
}
.card-title {
  font-size: 14px;
  /* height: 90px; */
  white-space:pre-wrap;
  word-break:break-word;
  line-height: 1.5rem;
  text-align: justify;
}
.v-rating .v-icon {
  padding: 0px;
}
</style>