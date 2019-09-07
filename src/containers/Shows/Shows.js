import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner';

const Shows = (props) => {
  const [show, setShow] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = props.match.params.id;
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(res => {
        const show = res.data
        
        setShow({
          name: show.name,
          summary: show.summary,
          image: show.image.medium
        })
        console.log('asdasdasidaisjda')

        setLoading(false)
      })
  }, [props])

  let content = <Spinner />
  if (!loading) {
    const summary = show.summary.replace(/<[/]?(p|b)>/g, '')
    const image = show.image;

    content = (
      <React.Fragment>
      {console.log('asdasda')}
        <p>{show.name}</p>
        <p>{summary}</p>
        <img src={image} alt=""/>
      </React.Fragment>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default Shows;
