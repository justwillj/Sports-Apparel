/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './Logging-Error.css';

const LoggingErrorPage = ({list}) => {
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
return(
  <div>
    <h1>Error Logging Page</h1>
    {list.slice(0).reverse().map((error)=>(
        <div className='logging-error'>
        <h1>{error}</h1>
        <h1>{error.time}</h1>
        <h1>{error.message}</h1>
        </div>
    
    ))}
  </div>
);
}
export default LoggingErrorPage;