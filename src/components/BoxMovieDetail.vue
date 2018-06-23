<template>
<div class="ten wide column videoContent boxMovieDetail">
  <div class="ui contentInfo">

    <div id="tab-trailler" class="tab active">
      <div class="traillers" v-if="trailler_list">
        <iframe
          v-for="trailler in trailler_list"
          :key="trailler.pk"
          :src="'https://www.youtube.com/embed/' + trailler.key"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    </div>

    <div id="tab-download" class="tab">
      <div class="ui relaxed divided list" v-if="torrent_list">
        <div class="item"
             v-for="torrent in torrent_list" 
             :key="torrent.name">

          <div class="right floated content">
            <a :href="torrent.link"><div class="ui button">Add</div></a>
          </div>

          <!-- <i class="large github middle aligned icon"></i> -->
          <div class="content magnet_links_content">
            <div class="title">{{ torrent.name }}</div>
            <div class="description">
              seeds: {{ torrent.seeds }} | leeches: {{ torrent.leeches }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="ui grid controller serie">
    <div class="row">
      <button class="ui mini button" @click="openTab('tab-trailler')">Traillers</button>
      <button class="ui mini button" @click="openTab('tab-download')">Download</button>
    </div>
  </div>

</div>
</template>


<script>
import TheMovieDbApi from '@/api/themoviedb.js'
import Flex from '@/api/flex.js'

export default {
  name: 'box-movie-detail',
  props: ['movie'],

  data () {
    return {
      trailler_list: [],
      torrent_list: []
    }
  },

  created () {
    this.fetch_traillers()
  },

  methods: {
    fetch_traillers () {
      this.trailler_list = []

      TheMovieDbApi.getMovieTraillers(this.movie.id).then(response => {
        this.trailler_list = response.data.results
      })
    },

    fetch_torrents () {
      this.torrent_list = []

      const result = Flex.search(this.movie.title)
      result.then(response => {
        this.torrent_list = response.data.results
      })
    },

    openTab (tab) {
      const tabs = document.querySelectorAll('.contentInfo .tab')

      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active')
      }

      // get traillers
      if (tab === 'tab-trailler' && this.trailler_list.length === 0) {
        this.fetch_traillers()
      }

      // Get torrent magnet links
      if (tab === 'tab-download' && this.torrent_list.length === 0) {
        this.fetch_torrents()
      }

      document.getElementById(tab).classList.add('active')
    }
  }
}
</script>


<style lang="sass">
// Variables
$first-color: #09c3e5
$second-color: #999
$third-color: #fff


.boxMovieDetail .contentInfo
  position: relative
  max-width: 100%
  height: 500px
  overflow: hidden
  background: #ffffff

  .tab
    display: none
    height: inherit

    .item
      border-top: 1px solid rgba(34,36,38,.15)
    .item:first-child
      margin-top: 5px

  #tab-trailler
    overflow: auto
    text-align: left

    .traillers iframe
      width: 100%
      height: 500px
      box-shadow: -3px 2px 8px 0px #000
      margin-top: 20px
      background-color: #272727

    .traillers iframe:first-child
      margin-top: 0

  #tab-download
    overflow: auto
    text-align: left
    padding: 5px 0px 0px 5px

    .magnet_links_content
      .title
        color: #252525
  
  .active
    display: block !important

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

.videoContent
  text-align: center
</style>
