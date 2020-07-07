import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.png';

class ForgotPassword extends Component {
  render() {
    return (
      <div className="page-body-wraper forgot-password-main">
        <div className="container">
          <div className="content-wraper">
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <Link to='/'>
                  <div className="logo-wrap text-center">
                    <img src={logo} alt="logo" />
                  </div>
                </Link>
                <h2 className="text-center mb-4 form-title">Forgot Password</h2>
                <div className="auto-form-wrapper">
                  <form>
                    <div className="form-group bmd-form-group m-0">
                      <label htmlFor="exampleInputEmail1" className="bmd-label-static">E-mail ID</label>
                      <input
                        type="email"
                        className="form-control"
                        id="InputEmail"
                        placeholder="Email Address"
                      />
                    </div>
                    <div class="form-group d-flex justify-content-left p-0" />
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary login">Sumbit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;