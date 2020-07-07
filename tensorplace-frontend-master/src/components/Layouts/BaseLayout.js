import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const BaseLayout = ({children}) => 
  <>
    <Header />
      <div className="page-body-wraper">
        {children}
      </div>
    <Footer />
  </>

export default BaseLayout;
