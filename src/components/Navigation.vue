<template>
  <header id="navigation" class="ui fluid container">
        <div class="ui text menu">
            <!-- <div class="item">
                <img src="{% static 'core/images/logo.png' %}">
            </div> -->

            <a class="browse item nav">
                Navegar<i class="dropdown icon"></i>
            </a>

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
</template>

<script>
import TheMovieDbApi from '@/api/themoviedb.js'

export default {
  name: 'navigation',

  methods: {
    onSubmit () {
      TheMovieDbApi.searchMovie($('#search form input')[0].value).then(response => {
        console.log(response)
      })

      TheMovieDbApi.searchTvShow($('#search form input')[0].value).then(response => {
        console.log(response)
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
    color: $first-color !important
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
</style>
