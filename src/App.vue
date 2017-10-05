<template>
  <div id="app">
    <app-nav></app-nav>
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


div.modal.cardDetail
  .icon.close
    color: $third-color !important

  h2
    color: $third-color
    margin-bottom: 3px !important

  .extra
    margin-bottom: 1rem
  p
    font-size: 1.2em

  .genreTag a
    font-size: 0.8em
    margin-bottom: 5px

  .controller.movie
    h5
      margin: 3px 0 2px 0
    button
      background-color: rgba(43, 39, 39, 0.86) !important

      &.active
        background-color: rgb(103, 103, 103) !important

  .controller.serie
    margin-top: 5px

    h5
      margin: 3px 0 2px 0

    div.serieButtons
      margin-top: 5px !important
      padding-top: 0 !important

      h5
        display: inline-block

      button
        color: $third-color !important
        margin-bottom: 5px !important
        background-color: rgba(43, 39, 39, 0.86) !important

        &.active
          background-color: rgb(103, 103, 103) !important

      .episode
        padding-top: 0

        button
          display: none
          opacity: 0

          &.on
            opacity: 1
            display: inline-block

    .idiomLinks
      margin-left: 0

  .server
    button.button
      background-color: rgba(43, 39, 39, 0.86) !important
      //margin-right: 5px

      &.active
        background-color: rgb(103, 103, 103) !important
</style>
