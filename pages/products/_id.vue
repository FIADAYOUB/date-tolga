<template lang="pug">
.product-page
  h1 product : {{ $route.query.id }}
</template>
<script>
export default {
  name:"product-id",
  created () {
    console.log(this.$route);
  }
}
</script>