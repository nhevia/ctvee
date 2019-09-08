import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Shows from '../Shows/Shows'

import './Home.css'
import Logo from '../../components/Layout/Logo/Logo'

const Home = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([]) // too much?
  // const [logo, setLogo] = useState(Logo)

  // useEffect(() => {
  //   if (selectedOption) {
  //     setTimeout(() => {
  //       setLogo(null)
  //     }, 300)
  //   }
  // }, [selectedOption])

  // load page 1 show list from API, move elsewhere and only call once
  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows?page=0`)
      .then(res => {
        let shows = []
        res.data.forEach(entry => {
          shows.push({
            id: entry.id,
            label: entry.name,
            value: entry.name
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
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

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
      padding: 20,
    }),
    
  };

  return(
    <div style={{padding: '100px'}}>
      {selectedOption ? <Logo show={false}/> : <Logo show={true}/>}
      <Select 
        className={selectedOption ? "SelectedWithOption" : "SelectedWithoutOption"}
        styles={customStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        label="Single Select"
      />
      {selectedOption ? <Shows id={selectedOption.id}/> : null}
    </div>
  )
};

export default Home;