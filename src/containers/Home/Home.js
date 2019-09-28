import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Shows from '../Shows/Shows'

import Ellipsis from '../../components/UI/Loaders/Bars/LoaderBars'

import './Home.css'
import Logo from '../../components/Layout/Logo/Logo'

const Home = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)  
  const [options, setOptions] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if data is cached already in localStorage
    // TODO: implement time-based cache limit
    const showsStored = JSON.parse(localStorage.getItem("shows"))
    // shows will have AT LEAST 10k entries
    // TODO: think of another way, not convinced about the 10k check
    if (showsStored && showsStored.length > 10000) {
      let shows = []
      showsStored.forEach(entry => {
        shows.push({
          id: entry.i,
          label: entry.n,
          value: entry.n.toLowerCase()
        })
        setOptions(shows)
        setIsLoading(false)
      })
      return
    }
    
    // If this is the first time visiting the site    
    // FIXME: fetches only 2287x items, out of 39k. Seems like a dynamo limitation
    axios.get(`https://gbiq5irckk.execute-api.us-east-2.amazonaws.com/dev/getShowsName`)
      .then(res => {
        let shows = []
        res.data.forEach(entry => {
          shows.push({
            id: entry.i,
            label: entry.n,
            value: entry.n.toLowerCase()
          })
          setOptions(shows)
          setIsLoading(false)
        })
        localStorage.setItem("shows", JSON.stringify(res.data));
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
  };
  const hideMenu = () => {
    setOpenMenu(false)
  };

  // limit the items showings as options when searching
  const resultLimit = 6
  let i = 0

  return(
    <React.Fragment>
    <div  className="Home">
      {selectedOption ? <Logo isHome={false}/> : <Logo isHome/>}
      {isLoading ? <Ellipsis /> : 
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
        // limit options showing
        filterOption={({value}, query) => value.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
      />
      }
     
      
      
    </div>
    <div>
      {selectedOption && <Shows id={selectedOption.id}/>}
    </div>
    </React.Fragment>
  )
};

export default Home;

