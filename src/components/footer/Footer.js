import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer = () => {
  const [year, setYear] = useState();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <h2>
        {`${year}  Sports Apparel Inc `}
        &#169;
      </h2>
    </footer>
  );
};

export default Footer;
