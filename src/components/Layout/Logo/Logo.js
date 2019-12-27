import React from 'react';

import './Logo.css';

import LogoImage from '../../../images/logo.png';

const logo = ({ isHome }) => {
  return (
    <>
      <img
        className={isHome ? 'LogoHome' : 'LogoSmall'}
        src={LogoImage}
        alt=""
      />
    </>
  );
};

export default logo;
