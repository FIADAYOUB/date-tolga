<script>
import Products from '../components/products/products.vue'
import HandleList from '../components/handleList.vue'
export default {
  name: "Home",
  data: () => ({
  }),
  components: { Products, HandleList }
}
</script>
<template lang="pug">
.home-index
  div.home__wrapper
    handle-list
    div.home-contenu
      .header
        h1 Global store
        span {{ new Date().toLocaleDateString() }}
      .body
        Products
</template>
<style lang="sass">

.home-index
  background-color: darkgrey
  padding-top: 80px
  .home__wrapper
    display: flex
    .home-contenu
      padding: 0 8px
      width: 100%
      .header
        height: 200px
        margin-bottom: 8px
        border-radius: 10px
        background-color: white
        padding: 20px
      .body
        margin-bottom: 20px

</style>