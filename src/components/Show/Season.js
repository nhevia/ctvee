import React from 'react';

//import Spinner from '../UI/Loaders/Spinner/Spinner'
import Dots from '../../components/UI/Loaders/Dots/LoaderDots';
import useImage from '../../hooks/useImage';

import './Season.css'

const Season = (props) => {
  const [image, isLoading] = useImage(props.seasonData.image)

  let content = null
  if (props.seasonData) {
    content = (
      
      <div className="Season">
          <section>
            <p><b>Premiered</b>: {props.seasonData.premiereDate}</p>
            <p><b>End</b>: {props.seasonData.endDate}</p>
            <p><b>Episodes</b>: {props.seasonData.episodeOrder}</p>
          </section>
        
          {isLoading ? <Dots /> : image}
      </div>
    )
  } else {
    content = null
  }

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

export default Season;