const utilities = module.exports = {}

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
  // sort by month then day
}

utilities.firstLetterUppercase = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : undefined
}

utilities.lowercase = (string) => {
  return string ? string.toLowerCase() : undefined
}
