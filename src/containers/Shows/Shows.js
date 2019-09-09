import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Meta from '../../components/Show/Meta';
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
          id: show.id,
          name: show.name,
          summary: show.summary,
          image: show.image.medium,
          rating: show.rating.average,
          premiered: show.premiered
        })

        setLoading(false)
      })
  }, [props])

  return (
    <div style={{marginTop: '-200px'}}>
      {loading ? <Spinner /> : <Meta show={show} />}
    </div>
  );
}

export default Shows;
