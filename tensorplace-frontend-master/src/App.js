import React from 'react';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router,  } from 'react-router-dom';
import { fetchAuthToken } from './util/auth';
import { getCurrentUser, logoutRequest } from "./actions/RegistrationActions";
import routes from './routes/index';
import { configureStore } from './store';
import ScrollToTop from './components/Shared/ScrollToTop';

const store = configureStore(window.__INITIAL_STATE__);

if (fetchAuthToken()) {
  // Decode token and get user info and exp
  const decoded = jwt_decode(fetchAuthToken());
  // Set user and isAuthenticated
  let data = { user: { ...decoded }};
  store.dispatch(getCurrentUser(data));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutRequest());

    // Redirect to login
    window.location.href = "./login";
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            {routes}
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}
