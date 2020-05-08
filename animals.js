const fs = require('fs')
const data = require('./data.json')

// create
exports.post = (req, res) => {
  // req.body = {"avatar_url":"http://teste.com","name":"Marcella","birth":"2020-05-14","gender":"M","specialties":"teste"}
  // Object.keys(req.body) = ["avatar_url","name","birth","gender","specialties"]
  const keys = Object.keys(req.body)
  
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