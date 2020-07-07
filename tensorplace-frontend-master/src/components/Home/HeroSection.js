import React from 'react';
import heroImage from '../../assets/images/edu_hero.jpg';

const HeroSection = () => (
  <div className="banner-home" style={{ backgroundImage:`url(${heroImage})` }}>
    <div className="container">
      <div className="content-text">
        {/* <span className="content-brow">Learn with Google AI</span> */}
        <h1 className="content-title">
        A transparent marketplace and platform for machine learning and data science capabilities.
        </h1>
        <div className="content-body">
          <p>Making the latest ML capabilities seamlessly available and economically accessible to businesses, medium-sized companies and developers across the world.</p>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
