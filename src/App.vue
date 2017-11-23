<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
// Reset all
*
  margin: 0
  padding: 0
  list-style: none
  vertical-align: baseline
  border: 0
  outline: 0


// Variables
$first-color: #09c3e5
$second-color: #999
$third-color: #fff


// global definitions
body, html
  font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  cursor: default


a, h1, h2, h3, h4, h5, li, p, div, article
  color: #999


body
  background-color: #141414
  padding: 71px 40px

  @media screen and (min-width: 1500px)
    padding: 71px 170px


.ui.star.rating .icon
  color: rgba(255, 255, 255, 0.35)


.ui.modal, .ui.dimmer
  will-change: initial
</style>
