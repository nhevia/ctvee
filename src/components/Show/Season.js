import React from 'react';

// import Spinner from '../UI/Loaders/Spinner/Spinner'
import Dots from "../UI/Loaders/Dots/LoaderDots";
import useImage from '../../hooks/useImage';

import './Season.css';

const Season = ({seasonData}) => {
  const [image, isLoading] = useImage(seasonData.image);

  let content = null;
  if (seasonData) {
    content = (
      <div className="Season">
        <section>
          <p>
            <b>Premiered</b>: {seasonData.premiereDate}
          </p>
          <p>
            <b>End</b>: {seasonData.endDate}
          </p>
          <p>
            <b>Episodes</b>: {seasonData.episodeOrder}
          </p>
        </section>

        {isLoading ? <Dots /> : image}
      </div>
    );
  } else {
    content = null;
  }

  return <>{content}</>;
};

export default Season;
