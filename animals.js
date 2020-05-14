const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

/**
 * req.query.id -> http://localhost:3000/animals?id=1
 * req.body -> através do formulário (POST)
 * req.params.id -> rota /:id
 */

// show by id
exports.show = (req, res) => {
  const { id } = req.params
  const foundAnimal = data.animals.find((animal) => animal.id == id) // percorre o array para encontrar o animal

  if (!foundAnimal) return res.send('Animal not found :(')

  const animal = {
    ...foundAnimal,
    age: age(foundAnimal.birth),
    specialties: foundAnimal.specialties.split(','), // Pega a string e transforma num array
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundAnimal.created_at)
  }

  return res.render('animals/show', { animal })
}

// create
exports.post = (req, res) => {
  // req.body = {"avatar_url":"http://teste.com","name":"Marcella","birth":"2020-05-14","gender":"M","specialties":"teste"}
  const keys = Object.keys(req.body) // ["avatar_url","name","birth","gender","specialties"]

  for (let key of keys) {
    if (req.body[key] == '')
      return res.send('Please, fill all fields')
  }

  let { avatar_url, name, birth, gender, specialties } = req.body

  birth = Date.parse(birth)
  const created_at = Date.now() // Add a data de criação do registro.
  const id = Number(data.animals.length + 1) // Add ID.

  data.animals.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    specialties,
    created_at
  })

  // Escreve os dados no arquivo data.json.
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send(`Write file error: ${err}`)
    return res.redirect('/animals')
  })
}

// edit
exports.edit = (req, res) => {
  const { id } = req.params
  const foundAnimal = data.animals.find(animal => animal.id == id)
  if (!foundAnimal) return res.send('Animal not found :(')

  const animal = {
    ...foundAnimal,
    birth: date(foundAnimal.birth)
  }

  return res.render('animals/edit', { animal })
}

// put
exports.put = (req, res) => {
  const { id } = req.body
  let index = 0

  const foundAnimal = data.animals.find((animal, foundIndex) => {
    if (id == animal.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundAnimal) return res.send('Animal not found :(')

  const animal = {
    ...foundAnimal,
    ...req.body,
    birth: Date.parse(req.body.birth)
  }

  data.animals[index] = animal // Atualiza de acordo com o index

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send(`Write error: ${err}`)
    return res.redirect(`/animals/${id}`)
  })
}

// delete
exports.delete = (req, res) => {
  const { id } = req.body
  const filteredAnimals = data.animals.filter(animal => animal.id != id) // Retorna apenas o que for true
  data.animals = filteredAnimals // Atualiza os dados

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) return res.send(`Write error: ${err}`)
    return res.redirect('/animals')
  })
}
