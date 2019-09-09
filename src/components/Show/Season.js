import React, {useState, useEffect} from 'react';

import Spinner from '../UI/Spinner/Spinner'

const Season = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (props.seasonData.image) {
      setIsLoading(true)
      const httpsURL = props.seasonData.image.medium.replace('http', 'https')
      fetch(httpsURL)
        .then(response => response.blob())
        .then(images => {
          let outside = URL.createObjectURL(images)
          console.log(outside)
          setImage(
            <React.Fragment>
              <img src={outside} alt=""/>
            </React.Fragment>
          )
          setIsLoading(false)
        })
    } else {
      setImage('<No pic available>')
      setIsLoading(false)
    }
  }, [props.seasonData.image])


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
          {isLoading ? <Spinner /> : image}
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