<template>
<div id="cine-item" class="column">
    <div class="ui fluid card link" data-path="/series/55/">
        <div class="image">
            <img :src="'https://image.tmdb.org/t/p/w185' + cine.poster_path" :title="cine.title">
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'cine-item',
  props: ['cine']
}
</script>
