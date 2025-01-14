const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthenticatedAgent: false,
  token: localStorage.getItem("token"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS": {
      localStorage.setItem("token", action.payload.data.token);
      // console.log(action.payload.data);
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        user: action.payload.data.user,
        isAuthenticated: true,
      };
    }
    case "UPDATE_USER": {
      // console.log(action.payload, "UPDATE USER ACTION");
      return {
        ...state,
        ...action.payload.data,
        user: action.payload,
      };
    }
    case "SUCCESS_AGENT": {
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        isAuthenticatedAgent: true,
      };
    }
    case "LOGIN_SOCIAL": {
      localStorage.setItem("token", action.payload.data.token);
      console.log(action.payload.data);
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        user: action.payload.data.user,
        isAuthenticated: true,
      };
    }
    case "SUCCESS_LOGOUT": {
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        isAuthenticatedAgent: false,
        user: null,
      };
    }
    case "VERIFY_OTP": {
      localStorage.setItem("token", action.payload.data.token);
      // console.log(action.payload);
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        isAuthenticated: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
