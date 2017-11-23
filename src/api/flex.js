import Vue from 'vue'

const FlexBaseUrl = process.env.FLEX_BASEURL
const vue = new Vue()

export default {

  // Search for movies and series
  search (name) {
    return this.get('/search', 'name=' + name)
  },

  get (path, query) {
    const url = this.createUrl(path, query)
    return vue.$http.get(url)
  },

  post (path, query, payload) {
    const url = this.createUrl(path, query)
    return vue.$http.post(url, {body: payload})
  },

  createUrl (path, queryString) {
    if (queryString) {
      return FlexBaseUrl + path + '?' + queryString
    } else {
      return FlexBaseUrl + path
    }
  }
}
