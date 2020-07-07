import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../Header';
import Footer from '../Footer';

const DashboardLayout = ({ children }) =>
  <>
    <Header />
    <div className="my-saved-plugins">
      <div className="container">
        <div className="main-content trending">
          <div className="treding-list-filter">
            {children}  
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>

export default withRouter(DashboardLayout);
