import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Shows from '../Shows/Shows'

import './Home.css'
import Logo from '../../components/Layout/Logo/Logo'

const Home = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([]) // too much?
  const [openMenu, setOpenMenu] = useState(false)

  // load page 1 show list from API, move elsewhere and only call once
  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows?page=0`)
      .then(res => {
        let shows = []
        res.data.forEach(entry => {
          shows.push({
            id: entry.id,
            label: entry.name,
            value: entry.name.toLowerCase()
          })
          setOptions(shows)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // handle selector event
  const handleChange = selectedOption => {
    hideMenu()
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  // custom styles for react-select components
  const customStyles = {
    container: (base) => ({
      ...base,
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }),
    option: (base, state) => ({
      ...base,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'white' : 'black',
    }),
    dropdownIndicator: () => ({
      visibility: 'hidden'
    }),
  };

  // override default behaviour to not show react-select menu when selected
  const handleInputChange = (query, { action }) => {
    i = 0 
    if (action === "input-change") {
      setOpenMenu(true)
    }
    //return query.toLowerCase()
  };

  const hideMenu = () => {
    setOpenMenu(false)
  };

  const resultLimit = 6
  let i = 0

  return(
    <div className="Home">
      {selectedOption ? <Logo show={false}/> : <Logo show={true}/>}
      <Select 
        className={selectedOption ? "SelectedWithOption" : "SelectedWithoutOption"}
        styles={customStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}      
        placeholder={"Search your favourite series"}
        // override default behaviours for hiding options  
        onBlur={hideMenu}
        menuIsOpen={openMenu}
        onInputChange={handleInputChange}

        filterOption={({value}, query) => value.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
        //onInputChange={() => { i = 0 }}
      />
      {selectedOption && <Shows id={selectedOption.id}/>}
    </div>
  )
};

export default Home;