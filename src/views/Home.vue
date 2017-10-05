<template>
  <section id="home" class="mainView fluid container">
    <div class="cardSlider">
      <h3>
        <a href="/generos/series/">Séries em alta</a>
      </h3>

      <button v-on:click="getData">get data</button>
      <div class="ui five column doubling grid" v-if="results">

          <template v-for="item in results">
            <div class="column" v-bind:key="item.id">
                <div class="ui fluid card link" data-path="/series/55/">
                    <div class="image">
                        <img :src="'https://image.tmdb.org/t/p/w300' + item.poster_path" :title="item.title">
                    </div>
                </div>
            </div>
          </template>
      </div>
    </div>
  
    <div class="cardSlider">
      <h3>Filmes em alta</h3>

      <div class="ui eight column doubling grid ">
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5127/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/ki0s06d4iUeDEdLfCcQQO2NY6Co.jpg" alt="Gamer">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5126/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/rCJVCPCx8iNDPBx5FDOT4GbVTyM.jpg" alt="Dia dos Namorados Macabro">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5125/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/ilsiY4N4MB6fYO9BeBa8Qr85c3y.jpg" alt="A Noite dos Mortos Vivos">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5124/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/pVM5KHkt8xtBrl1EqFwJkojKcN6.jpg" alt="A Saga Crepúsculo: Eclipse">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5123/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/9IaNQxE7x7KiZkpfi3nHJw2DNKe.jpg" alt="O Homem de Aço">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5122/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/iReRIa5iiNP22hLZeWzqykjQVEm.jpg" alt="Dc SuperHero Girls Heroinas do Ano">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5121/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/5nj32k5bS2c5rOx0D8GyWKXAtrg.jpg" alt="Harry Potter e a Ordem da Fénix">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5120/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/1odLP7rNKM2Do9UJOWp0sOkixHV.jpg" alt="Harry Potter e as Relíquias da Morte: Parte 1">
              </div>
            </div>
          </div>
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/5119/">
              <div class="image">
                <img src="http://hdfilmesonlinegratis.net/wp-content/uploads/2015/09/LUA-NOVA.jpg" alt="A Saga Crepúsculo: Lua Nova">
              </div>
            </div>
          </div>
      </div>
    </div>
  
    <div class="cardSlider">
      <h3>Em cartaz</h3>

      <div class="ui eight column doubling grid">
        
          <div class="column">
            <div class="ui fluid card link" data-path="/filmes/4847/">
              <div class="image">
                <img src="https://image.tmdb.org/t/p/w185/eqyrDWoLVzE3BgxV3XdOupqr6eI.jpg" alt="Cinquenta Tons Mais Escuros">
              </div>
            </div>
          </div>
        
      </div>
    </div>
  
  </section>
</template>

<script>
import TheMovieDbApi from '@/api/themoviedb.js'

export default {
  name: 'home',
  data () {
    return {
      results: []
    }
  },
  methods: {
    getData: function () {
      this.results = []

      for (let i = 1; i < 5; i++) {
        let responsePromise = TheMovieDbApi.discover(i)
        responsePromise.then(response => {
          this.results.push.apply(this.results, response.data.results)
        })
      }
    }
  }
}
</script>

<style lang="sass">
section.mainView
  margin-top: 4.5vw

div.cardSlider
  margin-bottom: 3vw

  h3
    margin-bottom: 1em
    font-size: 1.714rem
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
