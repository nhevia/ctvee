import React from 'react';

//import Spinner from '../UI/Loaders/Spinner/Spinner'
import Dots from '../../components/UI/Loaders/Dots/LoaderDots';
import useImage from '../../hooks/useImage';

const Season = (props) => {
  const [image, isLoading] = useImage(props.seasonData.image)

  let content = null
  if (props.seasonData) {
    content = (
      <React.Fragment>
        <section style={{float: 'left'}}>
          <p><b>Premiered</b>: {props.seasonData.premiereDate}</p>
          <p><b>End</b>: {props.seasonData.endDate}</p>
          <p><b>Episodes</b>: {props.seasonData.episodeOrder}</p>
        </section>
        <section style={{float: 'right'}}>
          {isLoading ? <Dots /> : image}
        </section>
      </React.Fragment>
    )
  } else {
    content = null
  }

  return (
    <div >
      {content}
    </div>
  );
}

export default Season;