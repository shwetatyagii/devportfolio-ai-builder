export const initialAuthState = {
  user: null,
  isLoading: true,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isLoading: false };

    case "LOGOUT":
      return { user: null, isLoading: false };

    case "RESTORE_SESSION":
      return { user: action.payload, isLoading: false };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
