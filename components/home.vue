<script>
import Products from '../components/products/products.vue'
import HandleList from '../components/handleList.vue'
export default {
  name:"Home",
  data: () => ({
  }),
  components: { Products, HandleList }
}
</script>
<template lang="pug">
.home-index
  h1(class="white--text text-center mt-5")
  div.home__wrapper
    handle-list
    div.home-contenu
      .header
        h1 Global store
        span {{ new Date().toLocaleDateString() }}
      .body
        Products
</template>
<style>
.home-index {
  background-color: darkgrey;
}
.home__wrapper {
  display: flex;
}
.home-contenu {
  width: calc(100% - 350px);
}
.header {
  height: 200px;
  margin-bottom: 8px;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
}
</style>