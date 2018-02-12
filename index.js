const https = require('http')
const utilities = require('./libs/utilities')

const port = process.argv.PORT || 13000

https.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.url === '/all') {
    res.write(utilities.allPeopleByDayMonth())
  } else if (req.url.indexOf('/?q=') > -1) {
    const query = req.url.replace('/?q=', '')
    res.write(utilities.query(utilities.lowercase(query)))
  } else {
    res.write(utilities.nextBirthday())
  }
  res.end()
}).listen(port)
