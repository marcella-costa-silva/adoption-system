const fs = require('fs')
const data = require('./data.json')

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
    age: '',
    specialties: foundAnimal.specialties.split(','), // Pega a string e transforma num array
    created_at: '',
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

