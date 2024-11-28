import React from 'react';
import '../../assets/styles/styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Hi-Fi Cars Pte. Ltd. | All rights reserved.</p>
    </footer>
  );
};

export default Footer;