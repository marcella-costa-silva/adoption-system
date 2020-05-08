const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => res.redirect('/animals/index'))
routes.get('/animals', (req, res) => res.render('animals/index'))
routes.get('/people', (req, res) => res.render('people/index'))

module.exports = routes