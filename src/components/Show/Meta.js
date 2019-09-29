import React from 'react';

import Seasons from './Seasons';
import useImage from '../../hooks/useImage'
import Dots from '../UI/Loaders/Dots/LoaderDots'

import './Meta.css'

const Meta = (props) => {
  const summary = props.show.summary.replace(/<[/]?(p|b|i)>/g, '')
  // TODO: check why this is not working
  const [image, isLoading] = useImage(props.show.image)
  //const image = props.show.image;

  return (
    <div id="meta" className="Show">
      <h1 style={{textAlign: 'center'}}>{props.show.name}</h1>

      {/* <hr style={{width: "100%"}}/> */}
      
      <div className="Meta">
        {isLoading ? <Dots /> : image}
        <section>
        <p><b>Summary</b>: {summary}</p>
        <p><b>Rating</b>: {props.show.rating}</p>
        <p><b>Premiered</b>: {props.show.premiered}</p>
        </section>
      </div>
      
      {/* <hr style={{width: "100%"}}/> */}
      
      <div className="Seasons">
        <Seasons showId={props.show.id}/>
      </div>
      
    </div>
  );
}

export default Meta;