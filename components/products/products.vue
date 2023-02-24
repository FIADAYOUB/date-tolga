<script>
export default {
  name:"Products",
  data: () => ({
  })
}
</script>
<template lang="pug">
.products-index
  div(v-for="item in 9")
    v-card.grid-container(width="220" heigth="220")
      v-card-title Card title
      v-card-subtitle Card subtitle
      v-card-actions
        v-btn Click me
</template>
<style>
.products-index {
  background-color: white;
  height: fit-content;
  margin: 0 auto 200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: auto;
  justify-content: center;
  grid-gap: 2em;
  padding: 20px 0px;
}
.grid-container {
  margin: auto;
}
</style>