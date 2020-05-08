const fs = require('fs')

// create
exports.post = (req, res) => {
  const keys = Object.keys(req.body) // ["avatar_url","name","birth","gender","specialties"]
  
  for (let key of keys) {
    if (req.body[key] == '') 
      return res.send('Please, fill all fields')
  }

  // Escreve no arquivo com os dados.
  fs.writeFile('data.json', JSON.stringify(req.body), (err) => {
    if (err) return res.send(`Write file error: ${err}`)
    return res.redirect('/animals')
  })

  // req.body = {"avatar_url":"http://teste.com","name":"Marcella","birth":"2020-05-14","gender":"M","specialties":"teste"}
  // return res.send(req.body) // Corpo da requisição POST
}