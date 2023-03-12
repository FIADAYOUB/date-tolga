<script>
export default {
  name: "HandleList",
  data: () => ({
    category: [
      "smartphones"
      , "laptops"
      , "fragrances"
      , "skincare"
      , "groceries"
      , "home-decoration"
      , "furniture"
    ],
    panel: [0]
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
.handle-list.secondary
  h2(class="text-center") Shop by category
  div(class="mx-2 py-2")
    v-expansion-panels(v-model="panel" multiple)
      v-expansion-panel.accent
        v-expansion-panel-header Category
        v-expansion-panel-content
          template(v-for="cat in category")
            v-checkbox(v-model="selectedCategory" :label="cat" :value="cat")

</template>
<style lang="sass">
.handle-list
  height: fit-content
  margin: 0 20px
  border-radius: 10px
  h2
    width: 250px !important
  .v-expansion-panels
    .v-expansion-panel-header
      padding: 4px 24px
      min-height: 30px !important
    .v-expansion-panel-content
      .v-input--checkbox
        padding: 0 !important
        margin: 4px !important
        height: 30px
        .v-label
          font-size: 14px
        .v-input--selection-controls__input
          margin-right: 4px
          font-size: 18px
        .v-icon
          font-size: 20px
@media (max-width: 855px)
  .handle-list
    display: none
</style>