import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Meta from '../../components/Show/Meta';
//import Spinner from '../../components/UI/Loaders/Spinner/Spinner';
import Dots from '../../components/UI/Loaders/Dots/LoaderDots';
import imagePlaceholder from '../../images/no_image.png'

const Shows = (props) => {
  const [show, setShow] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true) // when showing a show from another one, we want to reset loading
    const id = props.id
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(res => {
        const show = res.data
        
        if (!show.summary) {
          show.summary = "No summary found"
        }
        if (!show.image) {
          show.image = {}
          show.image.medium = imagePlaceholder
        }

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
  }, [props.id]) // changed from props to id, somehow props is changing. TODO: FIX

  return (
    <div id="shows">
      {loading ? <Dots /> : <Meta show={show} />}
    </div>
  );
}

export default Shows;
