const currentUser = {
  email: null,
};

export const initialState = {
  userErrors: {},
  success: false,
  userUpdated: false,
  loggedIn: false,
  authToken: null,
  currentUser,
  currentUserErrors: {},
  isLoading: true,
};

export default initialState;
