const express = require('express')
const routes = express.Router()
const animals = require('./animals')

routes.get('/', (req, res) => res.redirect('/animals'))
routes.get('/animals', (req, res) => res.render('animals/index'))
routes.get('/animals/create', (req, res) => res.render('animals/create'))
routes.get('/owners', (req, res) => res.render('owners/index'))

routes.post('/animals', animals.post)

module.exports = routes