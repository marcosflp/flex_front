import Vue from 'vue'

const ThePirateBayUrl = 'http://api.themoviedb.org/3'
const vue = new Vue()

export default {
  discover: (page) => {
    const url = createUrl('/discover/movie', 'sort_by=popularity.desc&page=' + page)
    console.log(url)

    const res = vue.$http.get(url)

    return res
  }
}

function createUrl (path, queryString) {
  if (queryString) {
    return ThePirateBayUrl + path + '?api_key=a3f25a106c9ceaae7d72ccbe758b72ab&' + queryString
  } else {
    return ThePirateBayUrl + path + '?api_key=a3f25a106c9ceaae7d72ccbe758b72ab'
  }
}
