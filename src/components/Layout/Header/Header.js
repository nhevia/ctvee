import React from 'react';
import {Link} from 'react-router-dom';

const header = (props) => (
  <div style={{textAlign: "center"}}>
    <Link style={{padding: "20px"}} to="/">Home</Link>
    <Link style={{padding: "20px"}} to="/about">About</Link>
  </div>
);

export default header;