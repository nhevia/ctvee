import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import Shows from '../Shows/Shows'

const Home = (props) => {
  // const [shows, setShows] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([]) // too much?

  // load page 1 show list from API, move elsewhere and only call once
  useEffect(() => {
    axios.get(`http://api.tvmaze.com/shows?page=0`)
      .then(res => {
        console.log(res)
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

  // load show list according to our selection
  // useEffect(() => {
  //   let mounted = true;

  //   if (selectedOption) {
  //     axios.get(`http://api.tvmaze.com/shows/${selectedOption.id}`)
  //     //axios.get(`https://api.tvmaze.com/search/shows?q=${selectedOption.value}`)
  //       .then(res => {
  //         console.log(res.data)
  //         let shows = [{
  //           id: res.data.id,
  //             name: res.data.name
  //         }]
          
  //         if (mounted) {
  //           setShows(shows)
  //           console.log("component is mounted so we can set the show state")
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
    
  //   return () => {
  //     mounted = false;
  //     // console.log('cleaner ran, mounted is false now')
  //   }
  // }, [selectedOption])

  // populate array with each show item
  // let showList = [];
  // shows.forEach(show => (
  //   showList.push(
  //     <p key={show.id}>
  //       <Link to={`/shows/${show.id}`}>{show.name}</Link>
  //     </p>
  //   )
  // ))


  // handle selector event
  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);

  };

    return(
      <div style={{padding: '100px'}}>
        <Select 
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
        {selectedOption ? <Shows id={selectedOption.id}/> : null}
      </div>
    )
};

export default Home;