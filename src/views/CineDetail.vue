<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-body" v-if="cine">
                  <slot name="body">
                    <div class="ui basic fullscreen cardDetail">
                      <i class="close icon" @click="$router.push({name: 'home'})"></i>

                      <div class="ui content fluid stackable grid cardDetailContent">
                        <div class="ui five wide column">
                          <h1>{{ cine.title || cine.name }}</h1>

                          <div class="extra" v-if="cine.vote_average">
                            IMDB Rating:
                            <div class="ui star rating"></div>
                            <span class="small">{{ cine.vote_average }}</span>
                          </div>

                          <div class="extra genreTag" v-if="cine.genres">
                            <a class="ui label" v-for="genre in cine.genres" :key="genre.id">{{ genre.name }}</a>
                          </div>

                          <p>{{ cine.overview }}</p>
                        </div>

                        <box-movie-detail 
                          v-if="cine_type === 'movie'"
                          :movie="cine">
                        </box-movie-detail>

                        <box-tvshow-detail
                          v-if="cine_type === 'tvshow'"
                          :tvshow="cine">
                        </box-tvshow-detail>
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

export default {
  name: 'cine-detail',

  data () {
    return {
      cine: null,

      cine_type: this.$route.params.type,
      cine_id: this.$route.params.id,

      trailler_list: [],
      torrent_list: []
    }
  },

  created () {
    this.fetchData()

    // prevent scronling on body
    $('body').addClass('open-modal')

    window.addEventListener('keyup', () => {
      // Close modal on esc key press
      if (event.keyCode === 27) {
        this.$router.push({name: 'home'})
      }
    })
  },

  updated () {
    // Jquery hacks to work with Semantic UI
    // Create the stars on rating
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
  },

  destroyed () {
    // undo prevent scronling on body
    $('body').removeClass('open-modal')
  },

  methods: {
    fetchData () {
      if (this.cine_type === 'movie') {
        this.fetchMovie()
      } else if (this.cine_type === 'tvshow') {
        this.fetchTvShow()
      }
    },

    fetchMovie () {
      TheMovieDbApi.getMovie(this.cine_id).then(response => {
        this.cine = response.data
      })
    },

    fetchTvShow () {
      TheMovieDbApi.getTvShow(this.cine_id).then(response => {
        this.cine = response.data

        TheMovieDbApi.getTvShowVideos(this.cine_id).then(response => {
          this.trailler_list = response.data.results
        })
      })
    }
  }

}
</script>


<style lang='sass'>
// Variables
$first-color: #09c3e5
$second-color: #999
$third-color: #fff

.open-modal
  overflow: hidden

div.cardDetail
  .icon.close
    color: $third-color !important
    position: absolute !important
    right: 1rem !important
    cursor: pointer

  h1
    color: $third-color
    margin-bottom: 3px !important

  .extra
    font-size: 0.9rem
    margin-bottom: 1rem

    .ui.rating
      font-size: 0.9rem

    span
      font-size: 0.7rem
  p
    font-size: 1.2em

  .genreTag a
    font-size: 0.8em
    margin-bottom: 5px

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
