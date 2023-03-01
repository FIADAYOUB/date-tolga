<script>
export default {
  name:"productCard",
  props:{
    product:{type: Object, default: null, required: true},
    grid:{type: Boolean, default: false, required: true}
  },
  methods: {
    addToFav (item) {
      if (this.$store.state.products.itemsFav.find(e => e===this.product.id)) {
        // remove from fav list
        this.$store.commit('products/removeFromFav', item.id)
      } else {
        // add to fav list
        this.$store.commit('products/addToFav', item.id)
      }
    }
  },
  computed: {
    isFav() {
      return this.$store.state.products.itemsFav.find(e => e===this.product.id) ? 'red' : 'grey'
    }
  }
}
</script>
<template lang="pug">
.product-card(style="width:100%")
  template(v-if="grid")
    v-card(class="mx-auto" max-width="300")
      v-img(
        class="align-end text-white"
        height="150"
        :src='product.images[0]'
        cover)
        v-btn(icon :color="isFav" style="position: absolute; top: 4px; right: 5px", @click="addToFav(product)")
          font-awesome-icon(icon="fa-heart" style="fontSize:20px" )
      v-card-title.card-title {{ product.title }}
      v-card-subtitle(class="d-flex justify-space-between px-3")
        div {{ product.price }} $
        v-rating(
          v-model="product.rating"
          color="yellow"
          half-increments
          readonly)
      v-card-actions(class="justify-center")
        v-btn Add to card
  template(v-else)
    v-col(cols="12")
      v-card(style="max-height: 220px")
        v-btn(icon :color="isFav" style="position: absolute; top: 4px; right: 5px; width:30px", @click="addToFav(product)")
          font-awesome-icon(icon="fa-heart" style="fontSize:20px")
        div(class="d-flex")
          v-avatar(class="ma-3" size="130" rounded="0")
            v-img( class="align-end text-white" height="150" :src='product.images[0]' cover)
          div(class="pr-2")
            v-card-title.card-title(style="padding-top:0px") {{ product.title }}
            v-card-subtitle
              div(class="d-flex")
                div {{ product.price }} $
                v-rating(
                  v-model="product.rating"
                  color="yellow"
                  half-increments
                  readonly
                  class="pl-2")
              div(style="height:60px") {{ product.description }}
        v-card-actions(class="justify-end")
          v-btn Add to card

</template>
<style lang="sass">
.product-card
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