import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Meta from '../../components/Show/Meta';
import Dots from '../../components/UI/Loaders/Dots/LoaderDots';
import imagePlaceholder from '../../images/no_image.png';

const Shows = ({id}) => {
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // when rendering a show from another one, we want to reset loading
    // const {id} = props;
    axios.get(`https://api.tvmaze.com/shows/${id}`).then(res => {
      const localShow = res.data;

      if (!localShow.summary) {
        localShow.summary = 'No summary found';
      }
      if (!localShow.image) {
        localShow.image = {};
        localShow.image.medium = imagePlaceholder;
      }

      setShow({
        id: localShow.id,
        name: localShow.name,
        summary: localShow.summary,
        image: localShow.image,
        rating: localShow.rating.average,
        premiered: localShow.premiered,
        genres: localShow.genres,
        status: localShow.status
      });

      setLoading(false);
    });
  }, [id]); // FIXME: if "props" (no id) then it changes somehow

  return <div id="shows">{loading ? <Dots /> : <Meta show={show} />}</div>;
};

export default Shows;
