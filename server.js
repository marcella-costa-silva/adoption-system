const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverridde = require('method-override') // Utilizar PUT/DELETE no form

const server = express()

server.use(express.urlencoded({ extended: true })) // Faz funcionar o req.body
server.use(express.static('public'))
server.use(methodOverridde('_method')) // Sobrescreve o método (antes de routes)
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen(5000, () => console.log('Server is running'))