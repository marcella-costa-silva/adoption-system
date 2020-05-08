const fs = require('fs')
const data = require('./data.json')

// create
exports.post = (req, res) => {
  const keys = Object.keys(req.body) // ["avatar_url","name","birth","gender","specialties"]
  
  for (let key of keys) {
    if (req.body[key] == '') 
      return res.send('Please, fill all fields')
  }

  req.body.birth = Date.parse(req.body.birth)
  req.body.created_at = Date.now() // Add a data de criação do registro.
  

  // [{...}] 
  data.animals.push(req.body) // [{...}, {...}]

  // Escreve os dados no arquivo data.json.
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send(`Write file error: ${err}`)
    return res.redirect('/animals')
  })

  // req.body = {"avatar_url":"http://teste.com","name":"Marcella","birth":"2020-05-14","gender":"M","specialties":"teste"}
  // return res.send(req.body) // Corpo da requisição POST
}