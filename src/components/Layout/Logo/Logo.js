import React from 'react';

import './Logo.css'

import LogoImage from '../../../images/logo.png'

const logo = (props) => {
  return (
    <div >
      <img className={props.show ? "Logo" : "LogoHide"} src={LogoImage} alt=""/>
      </div>
  )
};

export default logo;