<template lang="pug">
.product-page(v-if="!loading")
  .product-info(v-if="!loading")
    .image__wrapper
      v-carousel(v-model="model" hide-delimiters cycle)
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
          div {{ dealPrice }} $
        v-divider(vertical class="mx-3" color="primary")
        div
          div Old price
          div  {{ product.price }} $
      div(class="my-2") {{ product.stock }} In stock
  .product-plus
    .overview__wrapper.mr-1
      h3 Overview
      div.pr-2 Offering impressive performance in a sleek package, the HP 15 laptop is a worthy pick for on-the-go productivity and portable entertainment. Powered by an Intel Core i5 CPU and 8GB RAM, it gives you fast and reliable performance for taking on challenging tasks. Equipped with fast charging technology and a durable battery, this laptop provides hours of uninterrupted operation.
      .return-option
        .d-flex
          v-icon.mt-3(hight="24px" color="black") mdi-certificate
          div.ml-2
            h5 Manufacturer's Warranty
            div Parts and Labour: 1 year
        .d-flex
          font-awesome-icon.mt-3(icon="fa-right-left")
          div.ml-2
            h5 Return Policy
            div 30 days to return or exchange
            a.text-decoration-underline Read return policy
    .delivery__wrapper.ml-1
      .d-flex.justify-center
        v-btn(:class="{'isDelivery': isDelivery}" @click="showDelivery()") Delivery
        v-btn(:class="{'isDelivery': !isDelivery}"  @click="showPickUp()") Pick up
      template(v-if="isDelivery")
        .d-flex.my-3.align-center
          //- add check bagde if we have delivery option
          //- v-badge(overlap icon="mdi-check" size="20px")
          font-awesome-icon(icon="fa-truck-fast" )
          h5.ml-2 Available to ship
        div.ml-6(style="font-size:12px")
          div This will be delivered as early as today!
          div
            span Enjoy fast, free shipping on
            span.font-weight-bold  most orders over $35.
        v-btn.full-btn.mt-3.ml-6(color="#ffce00" size="large") Add to Cart
        .option-box-price.mt-2.ml-6
          template(v-for="(option, i) in optionPrice")
            v-card.mr-3.px-4( @click="changePrice(option)" :class="{'primary' : option.title === selectedPrice.title}")
              h5(:class="{'py-3 px-auto' : !option.value}") {{ option.title }}
              div(v-if="option.value") {{ option.value }} $
      template(v-else)
        .d-flex.my-3.align-center
          font-awesome-icon(icon="fa-truck-fast")
          h5.ml-2 Available for free store pickup
        div.ml-6
          div Showing 3 closest stores near H9J
          v-card.mb-4
            v-card-text
              v-text-field(v-model="searchValue" :loading="loadingStore" density="compact" variant="solo" label="H9J" append-icon="mdi-magnify" single-line hide-details @click:append="searchStore()")
          div(v-if="!loadingStore" v-for="item in storeList")
            .d-flex.justify-start
              v-icon(color="primary") mdi-check
              .d-flex.pl-2
                div {{ item.name }}
                v-divider.mx-3(vertical)
                div {{ item.away }} Km away
            a.ml-3.text-decoration-underline Pick Up Here
          v-btn.full-btn.mt-3.ml-3(color="#ffce00" size="large") Pick up at store
  .product-detail.mx-15
    v-expansion-panels(v-model="panel" multiple)
      v-expansion-panel
        v-expansion-panel-header.b Cutomers reviews
        v-expansion-panel-content
          .rating__wrapper.d-flex
            .rating-review
              h3 Rattings
              div.d-flex
                div.mr-3  {{ product.rating }}
                v-rating.justify-center(v-model="product.rating" color="yellow" half-increments readonly)
              div Average rating based on {{ totalReview }} reviews
              h3 Rating Breakdown
              template(v-for="item in ratingList")
                .d-flex
                  div {{ item.star }}
                  v-icon(color="yellow") mdi-star
                  v-progress-linear.mt-3.mx-2(:value="bufferRating(item)" height="6" rounded )
                  div(style="width:30px") {{ item.number }}
              v-btn.ma-2.primary Write your review
            v-divider(vertical).mx-4
            .review-recomendation
              h3 Reviewer Recommendation
              .d-flex.mt-2
                v-icon(color="black") mdi-emoticon-happy-outline
                div.ml-2 Of the {{ totalReview }} reviewers who responded, 19 would recommend this product.
              v-divider.my-4
        v-expansion-panel
          v-expansion-panel-header.b Low Price Guarantee
          v-expansion-panel-content If you find a lower price with another retailer before you buy (or within 30 days of purchase), we’ll gladly match that price. If our own price is reduced within 30 days of purchase, we’ll match it and refund you the difference. Conditions and exclusions apply.

</template>
<script>
export default {
  name: "product-id",
  data: () => ({
    loadingStore: false,
    searchValue: null,
    storeList: [],
    panel: [0],
    totalReview: 27,
    ratingList: [{ star: 5, number: 14 }, { star: 4, number: 5 }, { star: 3, number: 2 }, { star: 2, number: 0 }, { star: 1, number: 6 }],
    deal: 100,
    model: 0,
    product: null,
    loading: true,
    isDelivery: true,
    selectedPrice: { title: "No plan" },
    optionPrice: [{ title: "No plan" }, { title: "2 years", value: 159.99 }, { title: "3 years", value: 249.99 }, { title: "4 years", value: 289.99 }]
  }),
  created() {
    this.fetchData()
  },
  methods: {
    validateCanadianPostalCode(postalCode) {
      const postalCodeRegex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i);

      return postalCodeRegex.test(postalCode);
    },
    searchStore() {
      this.loadingStore = true
      console.log(this.validateCanadianPostalCode(this.searchValue))
      if (this.validateCanadianPostalCode(this.searchValue)) {
        // Get store list near searchValue
        setTimeout(() => {
          this.storeList = [
            { name: "Laval", away: 16.8 }, { name: "Vaudreuil", away: 14.9 }, { name: "Pointe Claire", away: 3.9 }
          ]
          this.loadingStore = false
        }, 2000)
      }
    },
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
    },
    changePrice(item) {
      this.selectedPrice = item
    },
    showDelivery() {
      this.isDelivery = true

    },
    showPickUp() {
      this.isDelivery = false
    },
    bufferRating(item) {
      return (item.number * 100) / this.totalReview
    }
  },
  computed: {
    dealPrice() {
      return this.product.price - (this.product.price * (this.product.discountPercentage / 100)).toFixed(2)
    }
  }
}
</script>
<style lang="sass">
.product-page
  div
    font-size: $font-size
    font-family: $font-family
    line-height: 24px
    color: #1d252c
    white-space: pre-wrap
    word-break: break-word
    line-height: 1.5rem
  .v-rating
    .v-icon
      padding: 0px
  .product-info
    display: flex
    padding: 180px calc(5% + 20px) 20px
    .image__wrapper
      width: 50%
      .v-carousel
        height: 300px !important
        .v-carousel__item
          height: 250px !important
    .infos
      .promo
        color: red
  .product-plus
    display: flex
    padding: 20px calc(5% + 20px)
    font-family: Human BBY,Arial,sans-serif
    .overview__wrapper
      width: 50%
      .return-option
        background-color: #f4f6f9
        padding: 4px
        .v-icon
          height: fit-content
    .delivery__wrapper
      width: 50%
      padding: 10px
      background-color: #f4f6f9
      .full-btn
        width: calc( 100% - 26px ) !important
      .v-btn
        width: 50%
      .isDelivery
        background-color: #0046be
      .option-box-price
        display: grid
        grid-gap: 0.5rem
        @media (min-width: 900px)
          grid-template-columns: repeat(3, 110px)
        @media (-width: 900px)
            grid-template-columns: repeat(2, 110px)
  .product-detail
    .rating-review
      width: 50%
    .review-recomendation
      width: 50%
  @media (max-width: 630px)
    .product-info
      flex-direction: column-reverse
      .image__wrapper
        width: 80%
        margin: auto
    .product-plus
      flex-direction: column-reverse
      .overview__wrapper, .delivery__wrapper
        width: 100% !important
    .product-detail
      .rating__wrapper
        flex-direction: column
        margin: auto
        .rating-review, .review-recomendation
          width: 100%
</style>
