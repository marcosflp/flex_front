<template>
<div class="ten wide column videoContent boxTvShowDetail">
  <div class="ui contentInfo">

    <div id="tab-trailler" class="tab">
      <div class="traillers" v-if="TraillerList">
        <iframe 
          v-for="trailler in TraillerList"
          :key="trailler.pk"
          :src="'https://www.youtube.com/embed/' + trailler.key"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    </div>

    <div id="tab-season" class="tab active">
      <div class="ui cards three column" v-if="season_list">
        <div class="ui card"
             v-for="season in sorted_season_list"
             :key="season.id"
             @click="set_season(season)">

          <div class="image">
            <img v-if="season.poster_path"
                 :src="'https://image.tmdb.org/t/p/w500' + season.poster_path">
            <img v-if="!season.poster_path"
                 :src="'https://image.tmdb.org/t/p/w500' + tvshow.poster_path">
          </div>

          <div class="content">
            <a class="header">{{ season.name }}</a>
            <div class="meta">
              <span class="date">air date: {{ season.air_date }}</span>
            </div>
            <!-- <div class="description">
              {{ season.overview }}
            </div> -->
          </div>

          <!-- <div class="extra content">
            <a>
              <i class="user icon"></i>
              22 Friends
            </a>
          </div> -->
        </div>
      </div>
    </div>

    <div id="tab-episodes" class="tab">
      <div v-if="Season && episode_list">
        <div class="episodes-header">
          <div class="content dividing">
            <img class="ui tiny image left floated"
                v-bind="Season"
                :src="'https://image.tmdb.org/t/p/w500' + Season.poster_path">
            <h3>{{ Season.name }}</h3>
            <span>{{ Season.overview }}</span>
            <span v-if="!Season.overview">No description</span>
          </div>
        </div>

        <h4 class="ui horizontal divider header">
          <i class="film icon"></i> Episodes
        </h4>

        <div class="ui cards four column grid">
          <div class="ui card"
              v-for="episode in episode_list"
              :key="episode.id">
            <div class="image">
              <img v-if="episode.still_path" :src="'https://image.tmdb.org/t/p/w500' + episode.still_path">
            </div>

            <div class="content">
              <div class="header">{{ episode.episode_number }} - {{ episode.name }}</div>
              <div class="description">
                {{ episode.overview }}
              </div>
            </div>
            
            <div class="ui two bottom attached buttons">
              <div class="ui button" @click="fetch_episode_torrents(episode)">
                <i class="add icon"></i>
                Baixar
              </div>
              <div class="ui primary button">
                <i class="play icon"></i>
                Assistir
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>

    <div id="tab-download" class="tab">
      <div class="ui relaxed divided list" v-if="TorrentList">
        <div class="item"
             v-for="(torrent, torrent_indice) in TorrentList"
             :key="torrent.name">
          <div class="right floated content">
            <!-- <a :href="torrent.link"><div class="ui button">Add</div></a> -->
            <!-- <a @click="create_torrent(torrent_indice)"><div class="ui button">Add</div></a> -->
            <a :href="torrent.link"><div class="ui button">Add</div></a>
          </div>

          <!-- <i class="large github middle aligned icon"></i> -->
          <div class="content magnet_links_content">
            <div class="title">{{ torrent.name }}</div>
            <div class="description">
              seeds: {{ torrent.seeds }} | leeches: {{ torrent.leeches }} | {{ torrent.size[0] + torrent.size[1] }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="tab-downloading" class="tab">
      <table class="ui compact celled table">
        <thead class="full-width">
          <tr>
            <th>Title</th>
            <th>Size</th>
            <th>Path</th>
            <th>Status</th>
            <th>Pause</th>
          </tr>
        </thead>
        <tbody v-if="torrents.length > 0">
          <tr v-for="torrent in torrents"
              :key="torrent.id">
            <td>{{ torrent.name }}</td>
            <td>{{ torrent.size }}</td>
            <td>{{ torrent.path }}</td>
            <td>{{ torrent.status }}</td>

            <td class="collapsing">
              <div class="ui fitted slider checkbox">
                <input type="checkbox"> <label></label>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot class="full-width">
          <tr>
            <th></th>
            <th colspan="4">
              <div class="ui right floated small primary labeled icon button">
                <i class="user icon"></i> Add User
              </div>
              <div class="ui small  button">
                Approve
              </div>
              <div class="ui small  disabled button">
                Approve All
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>

  </div>

  <div class="ui grid controller serie">
    <div class="row">
      <button class="ui mini button" @click="open_tab('tab-trailler')">Traillers</button>
      <button class="ui mini button" @click="open_tab('tab-season')">Seasons</button>
      <button class="ui mini button" @click="open_tab('tab-download')">Links</button>
      <button class="ui mini button" @click="open_tab('tab-downloading')">Download</button>
    </div>
  </div>

</div>
</template>


<script>
import TheMovieDbApi from '@/api/themoviedb.js'
import Flex from '@/api/flex.js'

export default {
  name: 'box-tvshow-detail',
  props: ['tvshow'],

  data () {
    return {
      TraillerList: [],
      TorrentList: [],
      Season: null,
      season_list: [],
      episode_list: [],
      current_episode: null,
      torrents: []
    }
  },

  watch: {
    Season (newSeason) {
      this.episode_list = newSeason.episodes
    }
  },

  computed: {
    sorted_season_list () {
      function compare (a, b) {
        // move specials to the end
        if (a.season_number === 0) {
          return 1
        }
        if (b.season_number === 0) {
          return -1
        }

        // default sort
        if (a.season_number < b.season_number) {
          return -1
        }
        if (a.season_number > b.season_number) {
          return 1
        }
        return 0
      }

      return this.season_list.sort(compare)
    }
  },

  created () {
    this.fetch_seasons()
  },

  methods: {
    fetch_traillers () {
      this.TraillerList = []

      TheMovieDbApi.getTvShowVideos(this.tvshow.id).then(response => {
        this.TraillerList = response.data.results
      })
    },

    fetch_episode_torrents (episode) {
      this.current_episode = episode
      this.TorrentList = []

      const q = this.tvshow.name + ' S' + ('0' + this.Season.season_number).slice(-2) + 'E' + ('0' + episode.episode_number).slice(-2)
      const result = Flex.search(q)
      result.then(response => {
        this.TorrentList = response.data.results
      })

      this.open_tab('tab-download')
    },

    fetch_seasons () {
      this.season_list = []

      let endpoint
      let result
      for (let i in this.tvshow.seasons) {
        endpoint = '/tv/' + this.tvshow.id + '/season/' + this.tvshow.seasons[i].season_number
        result = TheMovieDbApi.get(endpoint)
        result.then(response => {
          this.season_list.push(response.data)
        })
      }
    },

    get_season_by (seasonNumber) {
      for (let i = 0; i < this.season_list; i++) {
        if (this.season_list[i].season_number === seasonNumber) {
          return this.season_list[i]
        }
      }
      return null
    },

    list_season_episodes (seasonNumber, tab) {
      let season

      // find season on seasons list
      for (let i = 0; i < this.season_list.length; i++) {
        if (this.season_list[i].season_number === seasonNumber) {
          season = this.season_list[i]
        }
      }

      this.episode_list = season.episodes
      this.open_tab(tab)
    },

    set_season (season) {
      this.Season = season
      this.open_tab('tab-episodes')
    },

    create_torrent (torrentIndice) {
      this.TorrentList[torrentIndice]

      let torrent = {
        'name': this.TorrentList[torrentIndice].name,
        'type': 'tvshow',
        'themoviedb_movie_id': this.current_episode.id,
        'themoviedb_tvshow_id': this.current_episode.id,
        'magnet_link': this.TorrentList[torrentIndice].link,
        'size': this.TorrentList[torrentIndice].size[0] + this.TorrentList[torrentIndice].size[1]
      }

      let response = Flex.post('/api/v1/torrent/', null, torrent)
      return response
    },

    list_downloading_torrents () {
      this.torrents = []

      let response = Flex.get_local('/api/v1/torrent/')
      response.then(response => {
        this.torrents = response['data']
      })
    },

    open_tab (tab) {
      const tabs = document.querySelectorAll('.contentInfo .tab')

      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active')
      }

      // get traillers
      if (tab === 'tab-trailler' && this.TraillerList.length === 0) {
        this.fetch_traillers()
      }

      // get torrents
      if (tab === 'tab-downloading') {
        this.list_downloading_torrents()
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


.boxTvShowDetail .contentInfo
  position: relative
  max-width: 100%
  height: 500px
  overflow: hidden
  background: #ffffff

  .tab
    text-align: left
    display: none
    height: inherit
    overflow-y: auto
    overflow-x: hidden

  #tab-trailler
    .traillers iframe
      width: 100%
      height: 500px
      box-shadow: -3px 2px 8px 0px #000
      margin-top: 20px
      background-color: #272727

    .traillers iframe:first-child
      margin-top: 0

  #tab-season
    .magnet_links_content
      .title
        color: #252525
    
    .ui.cards .card
      cursor: pointer
  
  #tab-episodes
    padding: 10px

    .episodes-header
      overflow: auto
      margin-top: 5px

      h3
        margin: 0 0 5px 0
        color: #000

    .ui.horizontal.divider.header
      margin-bottom: 1.7rem

  #tab-download
    padding: 5px 0px 0px 5px

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
