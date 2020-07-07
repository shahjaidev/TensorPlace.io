import React, { Component } from "react";
import { bool, shape, func, string } from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addUserRequest, resetSuccess
} from '../../actions/RegistrationActions';
import {
  getUserErrors,
  getSuccess,
} from '../../reducers/RegistrationReducer';
import { getLoading } from '../../reducers/ApiReducer';

import logo from '../../assets/images/logo.png';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    githubId: '',
  },
  userErrors: {},
}
class SignUp extends Component {
  state = {
    ...initialState,
  }

  componentDidMount() {
    this.props.dispatch(resetSuccess());
  }

  componentWillReceiveProps(nextProps) {
    const { success, userErrors } = nextProps;
    if (userErrors) {
      this.setState({
        userErrors: nextProps.userErrors
      });
    }
    if (success) {
      this.setState({ ...initialState });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetSuccess());
  }

  onFieldChange = (fieldName, str) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [fieldName]: str,
      },
    });
  };

  onTermsChange = (event) => {
    const { checked } = event.target;
    const { user } = this.state;

    this.setState({
      user: {
        ...user,
        termsAccepted: checked,
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addUser(this.state.user);
  };

  render() {
    const { userErrors } = this.state;

    return (
      <div className="page-body-wraper reg-wrapper" >
        <div className="container">
          <div className="content-wraper">
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <Link to='/'>
                  <div className="logo-wrap text-center">
                    <img src={logo} alt="logo" />
                  </div>
                </Link>
                <h2 className="text-center mb-4 form-title">Register</h2>
                <div className="auto-form-wrapper">
                  {this.props.success ? (
                    <div class="alert alert-info text-center" role="alert">
                      Thank you for registration
                    </div>
                  ) : (
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="form-group bmd-form-group m-0">
                        <label htmlFor="firstName" className="bmd-label-static">First Name</label>
                        <input
                          type="email"
                          onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                          value={this.state.user.firstName}
                          className="form-control"
                          name="firstName"
                          placeholder="First Name"
                        />
                        <span className="error">{userErrors.firstName}</span>
                      </div>
                      <div className="form-group bmd-form-group m-0">
                        <label htmlFor="exampleInputEmail1" className="bmd-label-static">Last Name</label>
                        <input
                          type="email"
                          onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                          value={this.state.user.lastName}
                          className="form-control"
                          name="lastName"
                          placeholder="Last name"
                        />
                        <span className="error">{userErrors.lastName}</span>
                      </div>
                      <div className="form-group bmd-form-group m-0">
                        <label htmlFor="email" className="bmd-label-static">E-mail ID</label>
                        <input
                          type="email"
                          onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                          value={this.state.user.email}
                          className="form-control"
                          name="email"
                          placeholder="Email Address"
                        />
                        <span className="error">{userErrors.email}</span>
                      </div>
                      <div className="form-group bmd-form-group m-0">
                        <label htmlFor="githubId" className="bmd-label-static">Github User ID</label>
                        <input
                          type="text"
                          onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                          value={this.state.user.githubId}
                          className="form-control"
                          name="githubId"
                          placeholder="Github User ID"
                        />
                        <span className="error">{userErrors.githubId}</span>
                      </div>
                      <div className="form-group bmd-form-group m-0">
                        <label htmlFor="exampleInputEmail1" className="bmd-label-static">Password</label>
                        <input
                          onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                          value={this.state.user.password}
                          className="form-control"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <span className="error">{userErrors.password}</span>
                      </div>
                      <div className="form-group bmd-form-group">
                        <label htmlFor="exampleInputEmail1" className="bmd-label-static">Confirm Password</label>
                        <input
                          onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                          value={this.state.user.password2}
                          className="form-control"
                          name="password2"
                          type="password"
                          placeholder="Confirm Password"
                        />
                        <span className="error">{userErrors.password2}</span>
                      </div>
                      <div className="form-group d-flex justify-content-left p-0 bmd-form-group is-filled">
                        <div className="form-check checkbox p-0">
                          <label>
                            <input
                              type="checkbox"
                              className="p-0"
                              onChange={this.onTermsChange}
                              value={this.state.user.termsAccepted || ''}
                            /><span className="checkbox-decorator"><span className="check"></span></span> I agree to terms
                          </label>
                          <span className="error">{userErrors.termsAccepted}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary login">Register</button>
                      </div>
                    </form>
                  )}
                  <div className="text-block text-center my-3">
                    <span>Already have and account? </span>
                    <Link to="login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userErrors: getUserErrors(state),
  success: getSuccess(state),
  isLoading: getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (userData) => dispatch(addUserRequest(userData)),
  dispatch,
});

SignUp.propTypes = {
  dispatch: func.isRequired,
  userErrors: shape({}).isRequired,
  success: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);