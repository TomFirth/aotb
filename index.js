const https = require('http')
const utilities = require('./libs/utilities')
const birthdays = require('./config/birthdays')

const firstName = (query) => {
  let people = []
  birthdays.forEach(person => {
    if (person.firstName === query) {
      people.push(person)
    }
  })
  return utilities.format(people)
}

const surname = (query) => {
  let people = []
  birthdays.forEach(person => {
    if (person.surname === query) {
      people.push(person)
    }
  })
  return utilities.format(people)
}

const all = () => {
  return utilities.format(birthdays)
}

const next = () => {
  return {}
}

https.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.url === '/all') {
    res.write(all())
  } else if (req.url.indexOf('/?f=') > -1) {
    const query = req.url.replace('/?f=', '')
    res.write(firstName(utilities.lowercase(query)))
  } else if (req.url.indexOf('/?s=') > -1) {
    const query = req.url.replace('/?s=', '')
    res.write(surname(utilities.lowercase(query)))
  } else {
    res.write(next())
  }
  res.end()
}).listen(13000)
