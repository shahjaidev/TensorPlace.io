import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from '../Shared/Loader';
import {
  userLoginRequest,
  userLoginGithub,
} from '../../actions/RegistrationActions';
import {
  getUserErrors,
  getUserLogin,
} from '../../reducers/RegistrationReducer';
import { getLoading } from '../../reducers/ApiReducer';

import logo from '../../assets/images/logo.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userErrors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.loggedIn) {
      this.props.history.push("/dashboard");
    }
    const url_string = window.location.href;

    var url = new URL(url_string);
    var code = url.searchParams.get("code");
    if (code) {
      const userData = {
        code: code
      }
      this.props.dispatch(userLoginGithub({
        userData
      }));
    }
  }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn) {
        this.props.history.push("/dashboard"); // push user to dashboard when they login
      }
      if (nextProps.userErrors) {
        this.setState({
          userErrors: nextProps.userErrors
        });
      }
    }

    githubLogin = () => {
      let CLIENT_ID = 'Iv1.c0ddcf861a850b5b';
      let REDIRECT_URI = window.location.href;

      window.location =
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`;
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
      e.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.dispatch(userLoginRequest(userData));
    };
    render() {
      const { userErrors } = this.state;

      return (
        <>
          <div className="page-body-wraper reg-wrapper">
            <div className="container">
              <div className="content-wraper">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <Link to='/'>
                      <div className="logo-wrap text-center">
                        <img src={logo} alt="logo" />
                      </div>
                    </Link>
                    <h2 className="text-center mb-4 form-title">Login</h2>
                    <div className="auto-form-wrapper">
                      <form noValidate>
                        <div className="form-group bmd-form-group m-0">
                          <label htmlFor="exampleInputEmail1" className="bmd-label-static">E-mail ID</label>
                          <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={userErrors.email}
                            id="email"
                            className="form-control"
                            type="email"
                          />
                          <span className="error">{userErrors.email}</span>
                        </div>
                        <div className="form-group bmd-form-group">
                          <label htmlFor="exampleInputEmail1" className="bmd-label-static">Password</label>
                          <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={userErrors.password}
                            id="password"
                            className="form-control"
                            type="password"
                          />
                          <span className="error">{userErrors.password}</span>
                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn btn-primary login" onClick={this.onSubmit}>Login</button>
                        </div>
                        <div className="form-group d-flex justify-content-between p-0">
                          <div className="form-check checkbox p-0">
                            <label>
                              <input
                                type="checkbox"
                                className="p-0"
                              />
                              <span className="checkbox-decorator">
                                <span className="check"></span>
                              </span> Keep me signed in
                          </label>
                          </div>
                          <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
                        </div>
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn btn-raised sign-with-btn"
                            onClick={this.githubLogin}
                          >
                            Sign in with GitHub
                        </button>
                        </div>
                        <div className="text-block text-center my-3">
                          <span>Not a member? </span>
                          <Link to="/register">Create new account</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.isLoading &&
            <Loader />
          }
        </>
      );
    }
  }

  const mapStateToProps = (state) => ({
    userErrors: getUserErrors(state),
    loggedIn: getUserLogin(state),
    isLoading: getLoading(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Login);