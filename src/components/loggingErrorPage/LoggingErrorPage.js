/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './Logging-Error.css';

const LoggingErrorPage = ({list}) => {
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
return(
  <div>
    <h1>Error Logging</h1>
    {list.slice(0).reverse().map((error,index)=>(
        <div key={index} className='logging-error'>
        <h1>{error}</h1>
        </div>
    
    ))}
  </div>
);
}
export default LoggingErrorPage;
