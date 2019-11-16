import React from 'react'

import './Logo.css'

import LogoImage from '../../../images/logo.png'

const logo = props => {
  return (
    <React.Fragment>
      <img
        className={props.isHome ? 'LogoHome' : 'LogoSmall'}
        src={LogoImage}
        alt=""
      />
    </React.Fragment>
  )
}

export default logo
