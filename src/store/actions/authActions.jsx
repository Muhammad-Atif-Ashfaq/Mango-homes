import axios from "axios";

export const login = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/login?email=${body.email}&password=${
        body.password
      }&role=${body.role}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const loginAgent = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/login?email=${body.email}&password=${
        body.password
      }&role=${body.role}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "SUCCESS_AGENT",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const logOut = () => async (dispatch) => {
  dispatch({
    type: "SUCCESS_LOGOUT",
  });
};
export const register = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/register`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "SUCCESS_REGISTER",
      payload: res.data,
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const verifyOTP = (id, otp) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/otp/verify?user_id=${id}&otp=${otp}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "VERIFY_OTP",
      payload: res.data,
    });
    return res;
  } catch (err) {
    // Handle the error
    throw err;
  }
};

export const resendOTP = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/otp/resend?user_id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    // Handle the error
    throw err;
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/password/forgot?email=${email}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateUser = (user) => async (dispatch) => {
  dispatch({
    type: "UPDATE_USER",
    payload: user,
  });
};
export const socialLogin = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}auth/social_login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "LOGIN_SOCIAL",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
