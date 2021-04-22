/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import Shows from '../Shows/Shows';

import Ellipsis from '../../components/UI/Loaders/Bars/LoaderBars';

import './Home.css';
import Logo from '../../components/Layout/Logo/Logo';
import { getCustomStyle } from './reactSelectStyle';

// move to state, listen to 'resize' event for changing state
const isMobile = window.innerWidth <= 500;

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gets shows data stored in localStorage
    const showsStored = JSON.parse(localStorage.getItem('shows'));
    // Gets last time shows were fetched from API
    const lastUpdate = JSON.parse(localStorage.getItem('last_update'));
    // Calculate if data is older than 7 days
    const oneWeekAgo = moment().subtract(7, 'days');
    const isDataOld = lastUpdate < oneWeekAgo.unix();

    // Retrieve show data from localStorage and set the options
    // TODO: not convinced about the 10k check, think an alternative
    if (showsStored && !isDataOld && showsStored.length > 10000) {
      fillOptions(showsStored);
      return;
    }

    // First time visiting the site or something is wrong
    axios
      .get(
        `https://gbiq5irckk.execute-api.us-east-2.amazonaws.com/dev/getShowsName`
      )
      .then(res => {
        fillOptions(res.data);
        localStorage.setItem('shows', JSON.stringify(res.data));

        const now = moment();
        localStorage.setItem('last_update', JSON.stringify(now.unix()));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  // Fill options with localStorage/axios
  const fillOptions = obj => {
    const shows = [];
    obj.forEach(entry => {
      shows.push({
        id: entry.i,
        label: entry.n,
        value: entry.n.toLowerCase()
      });
    });
    setOptions(shows);
    setDynamicOptions(shows);
    setIsLoading(false);
  };

  // Handle selector event
  const handleChange = option => {
    setOpenMenu(false);
    setSelectedOption(option);
  };

  // limit the items showings as options when searching
  const resultLimit = 8;
  let limitIndex = 0;

  // Override default behaviour to not show react-select menu when selected
  // eslint-disable-next-line consistent-return
  const handleInputChange = (value, { action }) => {
    // first shows are ugly to show by default ("#1 single"? lol)
    if (!value) {
      return '';
    }

    // reset resultLimit
    limitIndex = 0;

    // typing in the Select component
    if (action === 'input-change') {
      // filter only shows similar to our query
      const partialOptions = dynamicOptions.filter(
        item => item.value.toLowerCase() >= value.toLowerCase()
      );
      // order them a-z
      partialOptions.sort((a, b) => (a.value > b.value ? 1 : -1));
      // update the option list with our sorted array
      setOptions(partialOptions);
      // manual
      setOpenMenu(true);
    }

  };

  return (
    <>
      <div className={selectedOption ? 'HomeWithOption' : 'Home'}>
        {selectedOption ? <Logo isHome={false} /> : <Logo isHome />}
        {isLoading ? (
          <Ellipsis />
        ) : (
          <Select
            className={
              selectedOption ? 'SelectedWithOption' : 'SelectedWithoutOption'
            }
            styles={getCustomStyle}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder={
              isMobile ? 'Search series' : 'Search your favourite series'
            }
            // override default behaviours for hiding options
            onBlur={() => setOpenMenu(false)}
            menuIsOpen={openMenu}
            onInputChange={handleInputChange}
            // limit options showing
            filterOption={({ value }, query) => {
              limitIndex += 1;
              return value.indexOf(query.toLowerCase()) >= 0 && (resultLimit > limitIndex);
            }
            }
          />
        )}
      </div>
      <div>{selectedOption && <Shows id={selectedOption.id} />}</div>
    </>
  );
};

export default Home;
