import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getUserLogin,
} from '../../reducers/RegistrationReducer';

const PrivateRoute = ({ component: Component, layout: Layout, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  )
};

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loggedIn: getUserLogin(state),
});

export default connect(mapStateToProps)(PrivateRoute);