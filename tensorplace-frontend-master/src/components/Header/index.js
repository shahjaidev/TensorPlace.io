import React from 'react';
import { Link } from "react-router-dom";
import UserNav from './UserNav';
import Search from '../Shared/Search';

import logo from '../../assets/images/logo.png';

const Header = () => (
  <header className="header-home">
    <div className="header">
      <div className="container">
        <div className="header-top">
          <div className="row align-items-center">
            <div className="col-lg-3 col-sm-6 order-md-0">
              <Link to="/" className="brand-title d-flex align-items-center">
                <img src={logo} alt="brand-logo" />
                <p>TensorPlace</p>
              </Link>
            </div>
            <div className="col-lg-7 col-sm-12 order-2 order-lg-0 d-flex justify-content-center align-items-center">
              <div className="search-wraper d-flex">
                <div className="bmd-form-group bmd-collapse-inline pull-xs-right">
                  <Search />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6 text-right d-flex align-items-center justify-content-end">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
