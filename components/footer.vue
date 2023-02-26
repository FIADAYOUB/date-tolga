<script>
export default {
  name:"Footer",
  data: () => ({
    contacts: [
      { name:"github", icon:"mdi-github", url:""},
      {name:"gmail", icon:"mdi-gmail", url:""},
      {name:"linkedin", icon:"mdi-linkedin", url:""}
    ],
    helps: [
         { name: "Help Center", url: "" },
         { name: "Contact Us", url: "" },
         { name: "Login", url: "" }
       ],
    services: [
          {
            title: "955 rue legendre est, Montreal",
          },
          {
            title: "H2M 2J9",
          },
          {
            title: "4388354014",
          },
          {
          }
        ]
  })
}
</script>
<template lang="pug">

v-footer(dark).mx-auto.footer-index
  div.footer_wrapper(class="d-flex justify-space-between pa-3")
    div Get Help
      ul
        li(v-for="item in helps")
          a(class="white--text"  target="_blank" v-bind:href="item.url") {{ item.name }}
    div Company name
      ul.help
        li(class="white--text") 955 rue legendre est
        li(class="white--text") Montreal, H2M 2J9
        li
          a(class="white--text" href="tel:438-835-4014") (+1) 4388354014
    div
      a(target="_blank" v-bind:href="contact.url" v-for="contact in contacts")
        v-btn(class="mx-1 white--text" icon)
          v-icon(size="24px") {{ contact.icon }}
  div(class="white--text text-center mt-1" style="width:100%") Copyright &copy; {{ new Date().getFullYear() }}

</template>
<style lang="sass">
.footer-index
  width: 100%
  position: absolute
  bottom: 0
  ul
    list-style: none
    padding-left: 8px
    li
      font-family: 'Red Hat Text', sans-serif
      font-size: 12px
      a
        text-decoration: none
  .footer_wrapper
    width: inherit
    .help
      border-left: 1px solid

</style>


