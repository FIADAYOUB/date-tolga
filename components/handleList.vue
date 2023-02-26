<script>
export default {
  name:"HandleList",
  data: () => ({
    category: [
              "smartphones"
            , "laptops"
            , "fragrances"
            , "skincare"
            , "groceries"
            , "home-decoration"
            ,"furniture"
        ],
  panel:[0]
  }),
  computed: {
    selectedCategory: {
      get() {
          return this.$store.state.products.selectedCategory
      },
      set(val) {
          this.$store.commit('products/setSelectedCategory', val)
      }
    }
  }
}
</script>
<template lang="pug">
.handle-list
  h2(class="text-center") Shop by category
  div.ayoub(class="mx-2 py-2")
    v-expansion-panels(v-model="panel" multiple)
      v-expansion-panel
        v-expansion-panel-header Category
        v-expansion-panel-content
          template(v-for="cat in category")
            v-checkbox(v-model="selectedCategory" :label="cat" :value="cat")

</template>
<style>
.handle-list {
  background-color: white;
  width: 300px;
  height: fit-content;
  margin: 0 20px;
  border-radius: 10px;
}
.v-expansion-panel-header {
  padding: 4px 24px ;
  min-height: 30px !important;
}
.v-expansion-panel-content .v-expansion-panel-content__wrap .v-input {
  padding: 0 !important;
  margin: 4px !important;
  height: 30px;
}
.v-expansion-panel-content .v-expansion-panel-content__wrap .v-input .v-label{
  font-size: 14px;
}
.v-expansion-panel-content .v-expansion-panel-content__wrap .v-input .v-input--selection-controls__input{
  margin-right: 4px;
  font-size: 18px;
}
.v-expansion-panel-content .v-expansion-panel-content__wrap .v-input .v-icon{
  font-size: 20px;
}
</style>