import React from 'react';
import { ReactComponent as Plus } from '../../../images/play_plus.svg';
import { ReactComponent as Minus } from '../../../images/play_minus.svg';

import './IconStatus.css';

const IconStatus = ({status}) => {
  return (
    <>
      {status === 'Running' ? (
        <Plus className="Icon" />
      ) : (
        <Minus className="Icon" />
      )}
    </>
  );
};

export default IconStatus;
