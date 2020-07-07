import callApi from '../util/apiCaller';
import {
  clearAuthToken,
  fetchAuthToken,
  saveAuthToken
} from '../util/auth';
import { apiActions } from './ApiAction';
import * as registrationTypes from '../types/registration';

export function addUserSuccess(data) {
  return {
    type: registrationTypes.ADD_USER_SUCCESS,
    success: true,
  };
}

export function addUserFailure(data) {
  return {
    type: registrationTypes.ADD_USER_FAILURE,
    userErrors: data,
  };
}

export function changePasswordSuccess(data) {
  return {
    type: registrationTypes.CHANGE_PASSWORD_SUCCESS,
    success: true,
  };
}

export function changePasswordFailure(data) {
  return {
    type: registrationTypes.CHANGE_PASSWORD_FAILURE,
    userErrors: data,
  };
}

export function addUserRequest(user) {
  return (dispatch, getState) => {
    dispatch(apiActions.request());
    return callApi('users/register', 'POST', user)
      .then((res) => {
        if (res.data && res.status !== 200) {
          dispatch(apiActions.success());
          dispatch(addUserFailure(res.data));
        } else {
          dispatch(apiActions.success());
          dispatch(addUserSuccess(res.data));
        }
      })
      .catch((e) => {
        dispatch(addUserFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export const getCurrentUser = (data) => {
  return {
  type: registrationTypes.GET_CURRENT_USER,
  currentUser: {
    ...data,
  },
  userErrors: data.errors || {},
}};

export const getCurrentUserRequest = () => (dispatch) => {
  if (!fetchAuthToken()) {
    dispatch({ type: registrationTypes.REQUEST_CURRENT_USER_FAILED });
    return;
  }
  dispatch({ type: registrationTypes.REQUEST_CURRENT_USER });
  callApi('users/currentuser', 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getCurrentUser(res.data));
    }
    if (res.status === 401) {
      clearAuthToken();
      dispatch({ type: registrationTypes.REQUEST_CURRENT_USER_FAILED });
    }
  });
};

export function userLogin(res) {
  if (res.data.authToken) {
    saveAuthToken(res.data.authToken);
  }
  return {
    type: registrationTypes.USER_LOGIN,
    loggedIn: res.data.success,
    userErrors: res.data.errors || {},
  };
}

export const userLoginGithub = (userData) => {
  return (dispatch, getState) => {
    dispatch(apiActions.request());
    callApi('users/login/github', 'POST', userData).then((res) => {
      dispatch(userLogin(res));
      if (res.data.success) {
        dispatch(apiActions.success());
        dispatch(getCurrentUserRequest());
      }
    });
  };
}

export const userLoginRequest = (userData) => (dispatch) => {
  callApi('users/login', 'POST', userData).then((res) => {
    dispatch(userLogin(res));
    if (res.data.success) {
      dispatch(getCurrentUserRequest());
    }
  });
};

export function updateProfileRequest(userData) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('users/update', 'POST', userData)
      .then((res) => {
        if (res.data && res.status !== 200) {
          dispatch(apiActions.success());
          dispatch(addUserFailure(res.data));
        } else {
          dispatch(apiActions.success());
          dispatch(addUserSuccess(res.data));
          dispatch(getCurrentUserRequest());
        }
      })
      .catch((e) => {
        dispatch(changePasswordFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export function changePassword(user) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('users/reset_password', 'PUT', user)
      .then((res) => {
        if (res.data && res.status !== 200) {
          dispatch(apiActions.success());
          dispatch(changePasswordFailure(res.data));
        } else {
          dispatch(apiActions.success());
          dispatch(changePasswordSuccess(res.data));
        }
      })
      .catch((e) => {
        dispatch(changePasswordFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export function userLogout() {
  return { type: registrationTypes.USER_LOGOUT };
}

export function resetSuccess() {
  return { type: registrationTypes.RESET_SUCCESS };
}

export function logoutRequest() {
  return (dispatch) => {
    clearAuthToken();
    // browserHistory.replace('/signin');
    dispatch(userLogout());
  };
}