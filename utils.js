module.exports = {
  age: timestamp => {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    // getDate() -> dia do mês
    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age = age - 1
    }
      
    return age
  },
  date: timestamp => {
    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2) // pega os 2 últimos dígitos
    const day = `0${date.getUTCDate()}`.slice(-2) 

    console.log(`${year}-${month}-${day}`)
    
    return `${year}-${month}-${day}`
  }
}