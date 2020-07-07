import * as registrationTypes from '../types/registration';
import { initialState } from '../models/registration';

const RegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case registrationTypes.REQUEST_CURRENT_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case registrationTypes.REQUEST_CURRENT_USER:
      return {
        ...state,
        isLoading: true,
      };

    case registrationTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        currentUserErrors: action.userErrors,
        loggedIn: true,
        isLoading: false,
      };
    case registrationTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        success: action.success,
      };

    case registrationTypes.ADD_USER_FAILURE:
      return {
        ...state,
        userErrors: action.userErrors,
      };

    case registrationTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.success,
      };

    case registrationTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        userErrors: action.userErrors,
      };

    case registrationTypes.RESET_SUCCESS:
      return {
        ...state,
        success: initialState.success,
        userErrors: initialState.userErrors,
      };

    case registrationTypes.USER_LOGIN:
      return {
        ...state,
        loggedIn: action.loggedIn,
        userErrors: action.userErrors,
      };

    case registrationTypes.USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        currentUser: initialState.currentUser,
      };
    default:
      return state;
  }
};

export const getAuthToken = (state) => state.registration.authToken;
export const getCurrentUser = (state) => state.registration.currentUser;
export const getCurrentUserErrors = (state) => state.registration.currentUserErrors;
export const getSuccess = (state) => state.registration.success;
export const getUserErrors = (state) => state.registration.userErrors;
export const getUserLogin = (state) => state.registration.loggedIn;

export default RegistrationReducer;
