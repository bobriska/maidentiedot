import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterForm = ({filter, setFilter, selectedCountry}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  //not quite sure why useEffect needed, but first click on show requires it 
  useEffect(() => {if(selectedCountry.length > 0) {
    setFilter(selectedCountry)
  }}, [setFilter, selectedCountry])
  return(
    <form >
      <p>find countries: <input value={filter} onChange={handleFilterChange}/></p>
    </form>
  )
}

const Countries = ({filter, setCountry, allCountries}) => {
  const filteredCountries = allCountries.filter(value => value.name.common.toLowerCase().includes(filter.toLowerCase()))
  // if there is one country show that one
  if (filteredCountries.length === 1) { 
    return (
      <ShowCountry countryToShow={filteredCountries}/>
    )
  } 
  // otherwise show list of countries
  return (
      <ShowCountries filteredCountries={filteredCountries} setCountry={setCountry}/>
  )
}

const Button = ({handleClick, selected}) => 
  <button onClick={() => handleClick(selected)}>show</button>

const ShowCountries = ({filteredCountries, setCountry}) => {
  //show list of countries if ten or less found
  if (filteredCountries.length < 11) {
    return (
      <div>{filteredCountries.map(value => 
          <p key={value.name.common}>{value.name.common} 
            <Button handleClick={setCountry} selected={value.name.common}/>
          </p>)}
      </div>
    )
  }
  
  return (
    <div> Too many matches, specify another filter </div>
  )
}

const ShowCountry = ({countryToShow}) => {
  return (
    <div>{countryToShow
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
  const [selectedCountry, setCountry] = useState('')

  useEffect(() => {
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setAllCountries(response.data)
      })
  }, [])

  return (
    < >
      <FilterForm 
        filter={filter} 
        setFilter={setFilter} 
        selectedCountry={selectedCountry}/>
      <Countries 
        filter={filter} 
        setCountry={setCountry}
        allCountries={allCountries}/>
    </>
  )
}

export default App;
