import React, { Component } from "react";
import { connect } from "react-redux";
import Siderbar from '../Dashboard/Sidebar';
import Snackbar from '../Shared/Snackbar';

import {
  changePassword, resetSuccess
} from '../../actions/RegistrationActions';
import {
  getUserErrors,
  getSuccess,
} from '../../reducers/RegistrationReducer';

const initialState = {
  user: {
    password: '',
    password2: '',
  },
  userErrors: {},
}

class ChangePassword extends Component {
  state = {
    ...initialState,
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
      setTimeout(() => {
        this.props.dispatch(resetSuccess());
      }, 2000);
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

  onSubmit = e => {
    e.preventDefault();
    this.props.dispatch(changePassword(this.state.user));
  };

  render() {
    const { userErrors } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4">
            <Siderbar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="change-password-main">
              <div className="page-title">
                <h4>Change Your Password</h4>
              </div>
              <div className="content-wraper">
                <div className="auto-form-wrapper">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group bmd-form-group">
                      <label htmlFor="exampleInputEmail1" className="bmd-label-static">New password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.password}
                      />
                      <span className="error">{userErrors.password}</span>
                    </div>
                    <div className="form-group bmd-form-group">
                      <label htmlFor="exampleInputEmail1" className="bmd-label-static">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password2"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.password2}
                      />
                      <span className="error">{userErrors.password2}</span>
                    </div>
                    <div className="form-group d-flex justify-content-left p-0">
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary login">Change My Password</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {this.props.success &&
            <Snackbar msg="Password Changed successfully." />
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userErrors: getUserErrors(state),
  success: getSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);