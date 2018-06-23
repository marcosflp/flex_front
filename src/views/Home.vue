<template>
  <section id="home" class="mainView fluid container">
    <header id="navigation" class="ui fluid container">
      <div class="ui text menu">
          <!-- <div class="item">
              <img src="{% static 'core/images/logo.png' %}">
          </div> -->

          <!-- <a class="browse item nav">
            <i class="dropdown icon"></i>
            Home
          </a> -->

          <div class="right menu">
              <div id="search" class="item">
                  <form role="search" v-on:submit.prevent="onSubmit">
                      <div class="ui icon input">
                        <input type="search" name="q" placeholder="Pesquisar...">
                        <i class="search link icon"></i>
                      </div>
                  </form>
              </div>

              <div class="ui dropdown item navUser">
                  Usuário <i class="dropdown icon"></i>
                  <div class="menu navUserContent">
                      <div class="item">
                          <a href="">Perfil</a>
                      </div>
                      <div class="item">
                          <a href="">Sair</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="ui flowing basic admission popup navContent">
          <div class="ui attached stackable grid">
              <div class="two wide column">
                  <div class="ui link list">
                    <a href="{% url 'home' %}" class="item"><strong>Início</strong></a>
                    <a href="{% url 'home' %}" class="item"><strong>Minha lista</strong></a>
                    <a href="{% url 'home' %}" class="item"><strong>Novidades</strong></a>
                  </div>
              </div>
              <div class="three wide column">
                  <div class="ui link list">
                      <a href="/generos/series/" class="item">Series</a>
                      <a href="/generos/acao/" class="item">Ação</a>
                      <a href="/generos/anime/" class="item">Anime</a>
                      <a href="/generos/aventura/" class="item">Aventura</a>
                      <a href="/generos/classico/" class="item">Clássico</a>
                      <a href="/generos/comedia/" class="item">Comédia Romântica</a>
                  </div>
              </div>

              <div class="three wide column">
                  <div class="ui link list">
                      <a href="/generos/comedia-romantica/" class="item">Comédia</a>
                      <a href="/generos/corrida/" class="item">Corrida</a>
                      <a href="/generos/crime/" class="item">Crime</a>
                      <a href="/generos/cult/" class="item">Cult</a>
                      <a href="/generos/documentario/" class="item">Documentário</a>
                      <a href="/generos/drama/" class="item">Drama</a>
                  </div>
              </div>

              <div class="three wide column">
                  <div class="ui link list">
                      <a href="/generos/espionagem/" class="item">Espionagem</a>
                      <a href="/generos/fantasia/" class="item">Fantasia</a>
                      <a href="/generos/ficcao-cientifica/" class="item">Ficção científica</a>
                      <a href="/generos/guerra/" class="item">Guerra</a>
                      <a href="/generos/infantis/" class="item">Infantis</a>
                      <a href="/generos/musical/" class="item">Musical</a>
                  </div>
              </div>

              <div class="three wide column">
                  <div class="ui link list">
                    <a href="/generos/nacional/" class="item">Nacional</a>
                    <a href="/generos/novelas/" class="item">Novelas</a>
                    <a href="/generos/policial/" class="item">Policial</a>
                    <a href="/generos/romance/" class="item">Romance</a>
                    <a href="/generos/suspense/" class="item">Suspense</a>
                    <a href="/generos/terror/" class="item">Terror</a>
                  </div>
              </div>
          </div>
      </div>
    </header>

    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="search_result_movies.length === 0 && search_result_tvshow.length === 0">
      <cine-list-box :title="'Filmes populares'"
                     :results="results_popular_movies"
                     :type="'movie'">
      </cine-list-box>

      <cine-list-box :title="'Séries populares'"
                     :results="results_popular_tv_shows"
                     :type="'tvshow'">
      </cine-list-box>

      <cine-list-box :title="'Nos cinemas'"
                     :results="results_movies_in_theatres"
                     :type="'movie'">
      </cine-list-box>
    </div>

    <div v-if="search_result_movies.length > 0 | search_result_tvshow.length > 0">
      <cine-list-box :title="'Movies found'"
                     :results="search_result_movies"
                     :type="'movie'">
      </cine-list-box>

      <cine-list-box :title="'Tv Shows found'"
                     :results="search_result_tvshow"
                     :type="'tvshow'">
      </cine-list-box>
    </div>

    <!-- Render the detail page of movies and tv shows -->
    <router-view></router-view>

  </section>
</template>

<script>
import TheMovieDbApi from '@/api/themoviedb.js'

export default {
  name: 'home',

  data () {
    return {
      results_popular_movies: [],
      results_popular_tv_shows: [],
      results_movies_in_theatres: [],

      search_result_movies: [],
      search_result_tvshow: [],

      cineId: null,
      loading: false
    }
  },

  created () {
    // fetch the data when the view is created and the data
    // is already being observed
    this.fetchData()
  },

  methods: {
    fetchData: function () {
      this.results_movies_in_theatres = []

      this.getPopularMovies()
      this.getPopularTvShows()
      this.getMoviesInTheatres()
    },

    // get popular movies
    getPopularMovies () {
      this.results_popular_movies = []

      for (let i = 1; i < 3; i++) {
        let promiseResponse = TheMovieDbApi.discoverMovies(i)
        promiseResponse.then(response => {
          this.results_popular_movies.push.apply(this.results_popular_movies, response.data.results)
        })
      }
    },

    // get popular tv shows
    getPopularTvShows () {
      this.results_popular_tv_shows = []

      for (let i = 1; i < 3; i++) {
        let promiseResponse = TheMovieDbApi.discoverTvShows(i)
        promiseResponse.then(response => {
          this.results_popular_tv_shows.push.apply(this.results_popular_tv_shows, response.data.results)
        })
      }
    },

    // get movies in theatres
    getMoviesInTheatres () {
      for (let i = 1; i < 3; i++) {
        TheMovieDbApi.getMoviesInTheatres(i).then(response => {
          this.results_movies_in_theatres.push.apply(this.results_movies_in_theatres, response.data.results)
        })
      }
    },

    onSubmit () {
      this.search_result_tvshow = []
      this.search_result_movie = []

      TheMovieDbApi.searchMovie($('#search form input')[0].value).then(response => {
        this.search_result_movie.push.apply(this.search_result_movie, response.data.results)
      })

      TheMovieDbApi.searchTvShow($('#search form input')[0].value).then(response => {
        this.search_result_tvshow.push.apply(this.search_result_tvshow, response.data.results)
      })
    }

  }
}
</script>

<style lang="sass">
// Variables
$first-color: #09c3e5
$second-color: #999
$third-color: #fff

header
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 71px
  padding: 0 40px
  background-color: rgba(0, 0, 0, .7)
  z-index: 6

  .nav
    color: $second-color !important
    font-size: 1.2rem !important
    font-weight: 700 !important

    .icon
      margin: 0em 0em 0em 0.2em !important


  .navContent
    width: 70% !important
    background-color: rgba(0, 0, 0, .9) !important
    border: 1px solid rgba(255,255,255,.15) !important
    border-top: 2px solid rgba(255,255,255,.50) !important

    a
      color: $third-color !important
      font-weight: 400 !important

      &:hover
        text-decoration: underline

    .column:first-child
      border-right: 1px solid rgba(255,255,255,.25)

  #search
    input
      background: #141414 !important
      border: 1px solid rgba(255, 255, 255, 0.44) !important
      color: $third-color !important

    i.icon.search
      color: $third-color


  .navUser
    color: $third-color !important

    .navUserContent
      background-color: rgba(0, 0, 0, .9) !important
      border: 1px solid rgba(255,255,255,.15) !important
      border-top: 1px solid rgba(255,255,255,.20) !important


        color: $third-color !important
        
section.mainView
  margin-top: 4.5vw

div.cardSlider
  margin-bottom: 3vw

  h3
    margin-bottom: 1em
    font-size: 2.214rem
  .column
    padding: 0 0.5rem !important
    margin-bottom: 0.8em

  .card
    border-radius: 0
    box-shadow: none
    background: rgb(53, 53, 53)

    img
      border-radius: 0 !important
      height: auto !important

      @media screen and (width: 980px) and (orientation: portrait)
        height: 265px !important

div.searchCard
  margin-bottom: 3.5vw !important

</style>
