const moment = require('moment')
const birthdays = require('../config/birthdays')

const utilities = module.exports = {}

utilities.firstName = (query) => {
  let people = []
  birthdays.forEach(person => {
    if (person.firstName === query || person.firstName.includes(query)) {
      people.push(person)
    }
  })
  const lengthCheck = utilities.lengthCheck(people, query)
  if (lengthCheck) return lengthCheck
  return utilities.format(people)
}

utilities.query = (query) => {
  let people = []
  birthdays.forEach(person => {
    if (
      person.firstName === query ||
      person.surname === query ||
      person.firstName.includes(query) ||
      (person.alias && person.alias.indexOf(query) > -1)
    ) {
      people.push(person)
    }
  })
  const lengthCheck = utilities.lengthCheck(people, query)
  if (lengthCheck) return lengthCheck
  return utilities.format(people)
}

utilities.nextBirthday = () => {
  const today = moment().format('MM-DD')
  const allMonthDays = utilities.sortByDayMonth()
  allMonthDays.sort()
  let allPeople = []
  for (var i = 0; i < allMonthDays.length; i++) {
    birthdays.forEach(person => {
      const day = ('0' + person.dob.day).slice(-2)
      const month = ('0' + person.dob.month).slice(-2)
      const personDate = moment(month + '-' + day).format('MM-DD')
      if (month + '-' + personDate > today) {
        allPeople.push(person)
      }
    })
  }
  return JSON.stringify(allPeople[0])
}

utilities.lengthCheck = (people, query) => {
  if (people.length === 0) {
    return JSON.stringify({
      error: 'no matches',
      query
    })
  }
  return false
}

utilities.format = (content) => {
  let people = []
  content.forEach(person => {
    people.push({
      name: utilities.firstLetterUppercase(person.firstName) + ' ' + utilities.firstLetterUppercase(person.surname),
      dob: person.dob.day + '-' + person.dob.month + '-' + person.dob.year,
      age: utilities.age(person.dob.day, person.dob.month, person.dob.year)
    })
  })
  return JSON.stringify(people)
}

utilities.age = (day, month, year) => {
  const dob = new Date(year, month, day)
  const diff = Date.now() - dob.getTime()
  const age = new Date(diff)
  return Math.abs(age.getUTCFullYear() - 1970)
}

utilities.sortByDayMonth = () => {
  let allMonthDays = []
  birthdays.forEach(person => {
    const day = ('0' + person.dob.day).slice(-2)
    const month = ('0' + person.dob.month).slice(-2)
    allMonthDays.push(month + '-' + day)
  })
  return allMonthDays
}

utilities.allPeopleByDayMonth = () => {
  const allMonthDays = utilities.sortByDayMonth()
  allMonthDays.sort()
  let allPeople = []
  for (var i = 0; i < allMonthDays.length; i++) {
    birthdays.forEach(person => {
      const day = ('0' + person.dob.day).slice(-2)
      const month = ('0' + person.dob.month).slice(-2)
      if (month + '-' + day === allMonthDays[i]) {
        allPeople.push(person)
      }
    })
  }
  return utilities.format(allPeople)
}

utilities.firstLetterUppercase = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : undefined
}

utilities.lowercase = (string) => {
  return string ? string.toLowerCase() : undefined
}
