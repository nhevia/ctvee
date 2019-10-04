import React, { useState, useEffect } from 'react';
import moment from 'moment'
import Select from 'react-select';
import axios from 'axios';
import Shows from '../Shows/Shows'

import Ellipsis from '../../components/UI/Loaders/Bars/LoaderBars'

import './Home.css'
import Logo from '../../components/Layout/Logo/Logo'
import getCustomStyle from './reactSelectStyle'

const Home = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)  
  const [options, setOptions] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Gets shows data stored in localStorage
    const showsStored = JSON.parse(localStorage.getItem("shows"))
    // Gets last time shows were fetched from API
    const lastUpdate = JSON.parse(localStorage.getItem("last_update"))
    // Calculate if data is older than 7 days
    const oneWeekAgo = moment().subtract(7, 'days')
    const isDataOld = lastUpdate < oneWeekAgo.unix()

    // Retrieve show data from localStorage and set the options
    // TODO: not convinced about the 10k check, think an alternative
    if (showsStored && !isDataOld && showsStored.length > 10000) {
      fillOptions(showsStored)
      return
    }
    
    // First time visiting the site or something is wrong 
    // FIXME: fetches only 22870 items, out of 39k. Seems like a dynamo limitation
    axios.get(`https://gbiq5irckk.execute-api.us-east-2.amazonaws.com/dev/getShowsName`)
      .then(res => {
        fillOptions(res.data)
        localStorage.setItem("shows", JSON.stringify(res.data));

        const now = moment()
        localStorage.setItem("last_update", JSON.stringify(now.unix()));
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // Fill options from iterated object (could be localStorage or axios response)
  const fillOptions = (obj) => {
    let shows = []
    obj.forEach(entry => {
      shows.push({
        id: entry.i,
        label: entry.n,
        value: entry.n.toLowerCase()
      })
      setOptions(shows)
      setIsLoading(false)
    })
  }

  // Handle selector event
  const handleChange = selectedOption => {
    hideMenu()
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  // Override default behaviour to not show react-select menu when selected
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
    <div  className={selectedOption ? "HomeWithOption" : "Home"}>
      {selectedOption ? <Logo isHome={false}/> : <Logo isHome/>}
      {isLoading ? <Ellipsis /> : 
      <Select 
        className={selectedOption ? "SelectedWithOption" : "SelectedWithoutOption"}
        styles={getCustomStyle()}
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

