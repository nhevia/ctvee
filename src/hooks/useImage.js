import React, { useState, useEffect } from 'react';

import imagePlaceholder from '../images/no_image.png'

const useImage = (propImage) => {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (propImage) {
      setIsLoading(true)
      const httpsURL = propImage.medium.replace('http', 'https')
      fetch(httpsURL)
        .then(response => response.blob())
        .then(images => {
          let outside = URL.createObjectURL(images)
          setImage(
            <React.Fragment>
              <img src={outside} alt=""/>
            </React.Fragment>
          )
          setIsLoading(false)
        })
    } else {
      setImage(
        <React.Fragment>
          <img src={imagePlaceholder} alt=""/>
        </React.Fragment>
      )
      //setImage(imagePlaceholder)
      setIsLoading(false)
    }
  }, [propImage])

  return [image, isLoading]
}

export default useImage