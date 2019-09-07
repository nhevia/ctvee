import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = (props) => {
  const [shows, setShows] = useState([])

  useEffect(() => {
    let mounted = true;

    axios.get('https://api.tvmaze.com/search/shows?q=superman')
      .then(res => {
        let shows = []
        res.data.forEach(entry => {
          shows.push({
            id: entry.show.id,
            name: entry.show.name
          })
        })

        if (mounted) {
          setShows(shows)
          console.log("component is mounted so we can set the show state")
        }
      })
      .catch(error => {
        console.log(error)
      })
    
    return () => {
      mounted = false;
      console.log('cleaner ran, mounted is false now')
    }
  }, [props])

  let showList = [];
  shows.forEach(show => (
    showList.push(
      <p key={show.id}>
        <Link to={`/shows/${show.id}`}>{show.name}</Link>
      </p>
    )
  ))
    
    return(
      <div>
        <p style={{padding: "10px", textAlign: "center"}}>Home page</p>
        {showList}
      </div>
    )
};

export default Home;