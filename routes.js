const express = require('express')
const routes = express.Router()
const animals = require('./animals')

routes.get('/', (req, res) => res.redirect('/animals'))
routes.get('/animals', (req, res) => res.render('animals/index'))
routes.get('/animals/create', (req, res) => res.render('animals/create'))

routes.get('/animals/:id', animals.show)
routes.get('/animals/:id/edit', animals.edit)

routes.post('/animals', animals.post)

routes.put('/animals', animals.put)

module.exports = routes