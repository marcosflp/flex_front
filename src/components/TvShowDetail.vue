<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-body" v-if="cine">
                  <slot name="body">
                    <div class="ui basic fullscreen cardDetail">
                      <i class="close icon" @click="$emit('closeCineDetail')"></i>

                      <div class="ui content fluid stackable grid cardDetailContent">
                        <div class="ui five wide column">
                          <h2>{{ cine.name }}</h2>

                          <div class="extra" v-if="cine.vote_average">
                            IMDB Rating:
                            <div class="ui star rating"></div>
                            <span>{{ cine.vote_average }}</span>
                          </div>

                          <div class="extra genreTag" v-if="cine.genres">
                            <a class="ui label" v-for="genre in cine.genres" :key="genre.id">{{ genre.name }}</a>
                          </div>

                          <p>{{ cine.overview }}</p>
                        </div>

                        <div class="ten wide column videoContent">
                          <div class="ui contentInfo">

                            <div id="tab-trailler" class="tab">
                              <div class="traillers">
                                <iframe
                                  v-for="trailler in trailler_list"
                                  :key="trailler.pk"
                                  :src="'https://www.youtube.com/embed/' + trailler.key"
                                  frameborder="0"
                                  allowfullscreen>
                                </iframe>
                              </div>
                            </div>

                            <div id="tab-download" class="tab active">
                              <div class="ui relaxed divided list">
                                <div class="item" v-for="torrent in torrent_list" :key="torrent.name">
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
                      </div>
                    </div>
                  </slot>
                </div>
              </div>
          </div>
      </div>
  </transition>
</template>

<script>
import TheMovieDbApi from '@/api/themoviedb.js'
import Flex from '@/api/flex.js'

export default {
  name: 'tvshow-detail',
  props: ['tvShowId'],

  data () {
    return {
      cine: null,
      trailler_list: [],
      torrent_list: []
    }
  },

  created () {
    // get data
    this.fetchData()

    window.addEventListener('keyup', () => {
      // Close modal on esc key press
      if (event.keyCode === 27) {
        this.$emit('closeCineDetail')
      }
    })
  },

  methods: {
    fetchData () {
      // get tv show detail
      TheMovieDbApi.getTvShow(this.tvShowId).then(response => {
        this.cine = response.data

        TheMovieDbApi.getTvShowVideos(this.tvShowId).then(response => {
          this.trailler_list = response.data.results
        })

        // Jquery hacks to work with Semantic UI
        if (this.cine.vote_average) {
          const vote = this.cine.vote_average

          setTimeout(function () {
            $('.ui.rating')
              .rating({
                initialRating: Math.floor(vote),
                maxRating: 10
              })
              .rating('disable')
          }, 1)
        }
      })
    },

    openTab (tab) {
      const tabs = document.querySelectorAll('.contentInfo .tab')

      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active')
      }

      // Get torrent magnet links
      if (tab === 'tab-download') {
        if (this.torrent_list.length === 0) {
          const result = Flex.search(this.cine.name)
          result.then(response => {
            this.torrent_list = response.data.results
          })
        }
      }

      document.getElementById(tab).classList.add('active')
    }
  }

}
</script>


<style lang='sass'>
$first-color: #09c3e5
$second-color: #999
$third-color: #fff


div.cardDetail
  .icon.close
    color: $third-color !important
    position: absolute !important
    right: 1rem !important
    cursor: pointer

  h2
    color: $third-color
    margin-bottom: 3px !important

  .extra
    font-size: 0.9rem
    margin-bottom: 1rem

    .ui.rating
      font-size: 0.9rem

  p
    font-size: 1.2em

  .genreTag a
    font-size: 0.8em
    margin-bottom: 5px

  .contentInfo
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
        margin-top: 10px

      .item .content:last-child
        margin-left: 10px

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

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .9)
  display: table
  transition: opacity .3s ease


.modal-wrapper 
  display: table-cell
  vertical-align: middle


.modal-container 
  width: 100%
  margin: 0px auto
  padding: 20px 30px
  transition: all .3s ease
  font-family: Helvetica, Arial, sans-serif


.modal-header h3 
  margin-top: 0
  color: #42b983


.modal-body 
  margin: 20px 0


.modal-default-button 
  float: right

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter 
  opacity: 0


.modal-leave-active 
  opacity: 0


.modal-enter .modal-container,
.modal-leave-active .modal-container 
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

</style>
