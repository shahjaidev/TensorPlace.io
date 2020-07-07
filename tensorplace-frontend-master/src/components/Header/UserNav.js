import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  logoutRequest,
  getCurrentUserRequest
} from '../../actions/RegistrationActions';
import {
  getUserLogin,
  getCurrentUser,
} from '../../reducers/RegistrationReducer';

import userIcon from '../../assets/images/useravatar.png';

class UserNav extends Component {
  componentDidMount() {
    this.props.dispatch(getCurrentUserRequest());
  }
  logoutRequest = () => {
    this.props.dispatch(logoutRequest());
  }
  render() {
    const { loggedIn, currentUser } = this.props;
    return (
      <>
        {!loggedIn &&
          <div className="user">
            <Link to='/login'>Sign In</Link>
            <span>|</span>
            <Link to='/register'>Sign Up</Link>
          </div>
        }
        {loggedIn &&
          <>
            {/* <div className="nevigation-wrap">
              <ul className="mb-0 pl-0">
                <li>
                  <Link
                    to="#"
                    className="btn btn-primary btn-lg account"
                    role="button"
                  >
                    Upload new<div className="ripple-container"></div>
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="user">
              <div className="btn-group m-0">
                <button className="btn dropdown-toggle m-0 p-0" type="button" id="buttonMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={currentUser.profileImg || userIcon} alt="user-img"/>
                  {currentUser.userName}
                </button>
                <div className="dropdown-menu" aria-labelledby="buttonMenu1">
                  <Link to='/account' className="dropdown-item">Account</Link>
                  <Link to='/dashboard' className="dropdown-item">Dashboard</Link>
                  <a href="#" className="dropdown-item" onClick={() => this.logoutRequest()}>Logout</a>
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }
}

UserNav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  loggedIn: getUserLogin(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNav);