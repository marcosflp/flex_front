var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // Flex Backend domain
  FLEX_BASEURL: '"http://cloudatlas.org:8000/api/v1"',
  LOCAL_FLEX_BASEURL: '"http://localhost:8000"'
})
