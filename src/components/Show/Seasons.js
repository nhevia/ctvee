import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Season from './Season';
import './Seasons.css'

const Seasons = (props) => {
  const [seasons, setSeasons] = useState([])
  const [seasonsEl, setSeasonsEl] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(0)
  const [isMounted, setIsMounted] = useState(false) // prevents rendering Season more than once
  const id = props.showId

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then(res => {
        const data = res.data
        console.log(res.data)
        let seasons = []
        data.forEach(season => {
          seasons.push({
            number: season.number,
            summary: season.summary,
            image: season.image,
            premiereDate: season.premiereDate,
            endDate: season.endDate,
            episodeOrder: season.episodeOrder
          })
        });
        setSeasons(seasons)
        setIsMounted(true) // now render Season
      })
  }, [id])

  useEffect(() => {
    let seasonsArr = []

    seasons.forEach(season => {
      seasonsArr.push(
        <option key={season.number}>Season {season.number}</option>
      )
    })
    
    setSeasonsEl(seasonsArr)
    // FIXME: changes twice
  }, [seasons])

  const handleSeasonSelect = (event) => {
    event.preventDefault()
    setSelectedSeason(event.target.selectedIndex)
  }

  return (
    <React.Fragment>
      
      <div className="select">
        <select onChange={handleSeasonSelect}>
          {seasonsEl}
        </select>
      </div>

     
        {seasons && isMounted ? <Season seasonData={seasons[selectedSeason]}/> : null}
      
      </React.Fragment>
  )
}

export default Seasons;