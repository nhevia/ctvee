import React from 'react'

import Seasons from './Seasons'
import useImage from '../../hooks/useImage'
import Dots from '../UI/Loaders/Dots/LoaderDots'
import IconStatus from './Status/IconStatus'

import './Meta.css'

const Meta = ({ show }) => {
  const summary = show.summary.replace(/<[/]?(p|b|i)>/g, '')
  const [image, isLoading] = useImage(show.image)

  return (
    <div id="meta" className="Show">
      <h1 style={{ textAlign: 'center' }}>{show.name}</h1>

      {/* <hr style={{width: "100%"}}/> */}

      <div className="Meta ShowBox">
        {isLoading ? <Dots /> : image}
        <section>
          {/* <p dangerouslySetInnerHTML={{__html: summary}} ></p> */}
          <p>{summary}</p>
          <p>
            <b>Rating</b>: {show.rating}
          </p>
          <p>
            <b>Premiered</b>: {show.premiered}
          </p>
          <p style={{margin: "0px"}}>
            <b>Genres</b>: {show.genres.join(', ')}
          </p>
          <div className="ShowStatus">
            <p>
              <b>Status</b>: {show.status}
            </p>
            <IconStatus status={show.status} />
          </div>
        </section>
      </div>

      {/* <hr style={{width: "100%"}}/> */}

      <div className="Seasons ShowBox">
        <Seasons showId={show.id} />
      </div>
    </div>
  )
}

export default Meta
