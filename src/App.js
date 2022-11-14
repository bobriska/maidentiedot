import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterForm = ({filter, setFilter, countries, setCountries}) => {
  const handleFilterChange = (event) => setFilter(event.target.value)
  return(
    <form >
      <p>find countries: <input value={filter} onChange={handleFilterChange}/></p>
    </form>
  )
}

const Countries = ({filter, allCountries}) => {
  const filteredCountries = allCountries
    .filter(value => value.name.common.toLowerCase().includes(filter.toLowerCase()))
    
  if (filteredCountries.length === 1) { 
    return (
      <ShowCountry selectedCountry={filteredCountries}/>
    )
  } else {
    return (
      <ShowCountries filteredCountries={filteredCountries}/>
    )
  }
  
}

const ShowCountries = ({filteredCountries}) => {
  if (filteredCountries.length < 9) {
    return (
      <div>{filteredCountries.map(value => <p key={value.name.common}>{value.name.common} </p>)}</div>
    )
  } else {
    return (
      <div> Too many matches, specify another filter </div>
    )
  }
}

const ShowCountry = ({selectedCountry}) => {
return (
  <div>{selectedCountry
  .map(value => 
    <div key={value.name.common}>
      <h2>{value.name.common} </h2>
      <p>capital {value.capital}</p> 
      <p>area {value.area}</p>
      <h3>languages: </h3>
      <ul>{Object.values(value.languages).map(entry => <li key={entry}>{entry}</li>)}</ul>
      <img src={value.flags.png} alt='countries flag'></img>
    </div>
  )}</div>)
  }

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setAllCountries(response.data)
      })
  }, [])

  return (
    < >
      <FilterForm filter={filter} setFilter={setFilter}/>
      <Countries filter={filter} allCountries={allCountries}/>
    </>
  )
}

export default App;
