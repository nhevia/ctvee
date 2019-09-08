import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner';

const Shows = (props) => {
  const [show, setShow] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true) // when showing a show from another one, we want to reset loading
    const id = props.id
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(res => {
        const show = res.data
        
        setShow({
          name: show.name,
          summary: show.summary,
          image: show.image.medium
        })

        setLoading(false)
      })
  }, [props])

  let content = <Spinner />
  if (!loading) {
    const summary = show.summary.replace(/<[/]?(p|b|i)>/g, '')
    const image = show.image;

    content = (
      <React.Fragment>
        <p style={{textAlign: 'center', padding: '20px', fontWeight: 'bold'}}>{show.name}</p>
        <hr />
        <p style={{padding: '50px'}}>{summary}</p>
        <img style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} src={image} alt=""/>
      </React.Fragment>
    );
  }

  return (
    <div style={{marginTop: '-150px'}}>
      {content}
    </div>
  );
}

export default Shows;
