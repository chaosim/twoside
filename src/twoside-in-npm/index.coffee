### npm-compatible index.js ###

exports = module.exports =
  methodInIndex: ->
    console.log('twoside-in-npm/index.js')
    'twoside-in-npm/index.js'

exports.npm1 = require './npm1'


