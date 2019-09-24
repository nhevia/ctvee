import React from 'react';
//import Header from '../Layout/Header/Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const layout = (props) => (
  <div style={layoutStyle}>
    {props.children}
  </div>
);

export default layout;