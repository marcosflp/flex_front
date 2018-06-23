import Vue from 'vue'

const ThePirateBayUrl = 'http://api.themoviedb.org/3'
const vue = new Vue()

export default {
  // Get requests
  get (path, query) {
    const url = this.createUrl(path, query)
    return vue.$http.get(url)
  },

  // Returns the most popular movies
  discoverMovies (page = 1) {
    const url = this.createUrl('/discover/movie', 'sort_by=popularity.desc&page=' + page)
    return vue.$http.get(url)
  },

  // Returns the most popular tv shows
  discoverTvShows (page = 1) {
    const url = this.createUrl('/discover/tv', 'sort_by=popularity.desc&page=' + page)
    return vue.$http.get(url)
  },

  // Returns the movies that are in theatres
  getMoviesInTheatres (page = 1) {
    const url = this.createUrl('/discover/movie', 'primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&page=' + page)
    return vue.$http.get(url)
  },

  // Returns cines with the closest match of the query
  searchMovie (query, page = 1) {
    const url = this.createUrl('/search/movie', 'query=' + query)
    return vue.$http.get(url)
  },

  // Returns cines with the closest match of the query
  searchTvShow (query, page = 1) {
    const url = this.createUrl('/search/tv', 'query=' + query)
    return vue.$http.get(url)
  },

  // Returns traillers of a movie
  getMovieTraillers (id) {
    const url = this.createUrl('/movie/' + id + '/videos')
    return vue.$http.get(url)
  },

  // Get the videos that have been added to a TV show.
  getTvShowVideos (id) {
    const url = this.createUrl('/tv/' + id + '/videos')
    return vue.$http.get(url)
  },

  // Returns the page detail of the movie
  getMovie (id) {
    const url = this.createUrl('/movie/' + id)
    return vue.$http.get(url)
  },

  // Returns the page detail of a tv show
  getTvShow (id) {
    const url = this.createUrl('/tv/' + id)
    return vue.$http.get(url)
  },

  createUrl (path, queryString) {
    if (queryString) {
      return ThePirateBayUrl + path + '?api_key=a3f25a106c9ceaae7d72ccbe758b72ab&' + queryString
    } else {
      return ThePirateBayUrl + path + '?api_key=a3f25a106c9ceaae7d72ccbe758b72ab'
    }
  }
}
