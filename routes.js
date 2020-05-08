const express = require('express')
const routes = express.Router()
const dogs = require('./dogs')

routes.get('/', (req, res) => res.redirect('/animals'))
routes.get('/animals', (req, res) => res.render('animals/index'))
routes.get('/animals/create', (req, res) => res.render('animals/create'))
routes.get('/owners', (req, res) => res.render('owners/index'))

routes.post('/animals', dogs.post)

module.exports = routes