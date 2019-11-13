import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Season from "./Season";
import "./Seasons.css";

const useStyles = makeStyles({
  select: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

const Seasons = ({ showId }) => {
  const [seasons, setSeasons] = useState([]);
  const [seasonsEl, setSeasonsEl] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isMounted, setIsMounted] = useState(false); // prevents rendering Season more than once

  const classes = useStyles();

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`).then(res => {
      const data = res.data;
      console.log(res.data);
      let seasons = [];
      data.forEach(season => {
        seasons.push({
          number: season.number,
          summary: season.summary,
          image: season.image,
          premiereDate: season.premiereDate,
          endDate: season.endDate,
          episodeOrder: season.episodeOrder
        });
      });
      setSeasons(seasons);
      setIsMounted(true); // now render Season
    });
  }, [showId]);

  useEffect(() => {
    let seasonsArr = [];

    seasons.forEach(season => {
      seasonsArr.push(
        // <option key={season.number}>Season {season.number}</option>
        <MenuItem key={season.number} value={season.number}>
          Season {season.number}
        </MenuItem>
      );
    });

    setSeasonsEl(seasonsArr);
    // FIXME: changes twice
  }, [seasons]);

  const handleSeasonSelect = event => {
    event.preventDefault();
    console.log(event.target.value);
    setSelectedSeason(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="select">
        {/* <select onChange={handleSeasonSelect}>{seasonsEl}</select> */}
        <Select
          className={classes.select}
          value={selectedSeason}
          onChange={handleSeasonSelect}
        >
          {seasonsEl}
        </Select>
      </div>

      {seasons && isMounted ? (
        <Season seasonData={seasons[selectedSeason - 1]} />
      ) : null}
    </React.Fragment>
  );
};

export default Seasons;
