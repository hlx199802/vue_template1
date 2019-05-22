/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true&path=/_webpack_.do')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})
