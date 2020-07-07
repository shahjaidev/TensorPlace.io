import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer-sec">
    <div className="footer-main">
      <div className="container">
        <div className="copy-right text-center">
          Copyright © 2020 <Link to='/'>Tensorplace</Link>. All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
