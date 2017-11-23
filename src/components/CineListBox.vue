<template>
<div id="cine-box" class="cardSlider">
  <h3>{{ title }}</h3>

  <div class="ui five column doubling grid">
    <div class="column" 
         v-for="item in results" 
         :key="item.id" 
         @click="getCineDetail(item.id)">

        <div class="ui fluid card link">
            <div class="image">
                <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" :title="item.title">
            </div>
        </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'cine-box',
  props: ['type', 'results', 'title'],

  methods: {
    getCineDetail (id) {
      this.$router.push({name: 'cine-detail', params: {type: this.type, id: id}})
      document.querySelector('body').classList.add('open-modal')
    }
  }
}
</script>
