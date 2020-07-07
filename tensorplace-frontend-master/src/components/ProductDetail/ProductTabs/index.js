import React from 'react';
import Details from './Details';
import ProductReviews from './ProductReviews';
import Installation from './Installation';
import ContactDeveloper from './ContactDeveloper';

const ProductTabs = (plugin) => {
  return (
  <div className="detail-tabs-wraper">
    <ul className="tabs">
      <li className="tab-link current" data-tab="details">Details</li>
      <li className="tab-link" data-tab="reviews">Reviews</li>
      <li className="tab-link" data-tab="installation">Installation</li>
      <li className="tab-link" data-tab="contact-developer">Contact Developer</li>
    </ul>
    <Details {...plugin} />
    <ProductReviews {...plugin} />
    <Installation />
    <ContactDeveloper plugin={plugin} />
  </div>
);}

export default ProductTabs;
