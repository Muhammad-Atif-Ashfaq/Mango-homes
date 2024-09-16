import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

const getToken = () => {
  return localStorage.getItem("token");
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const getQuestionAns = (body) => async (dispatch) => {
  try {
    const res = await api.get("questions-with-answers", body);
    // dispatch({
    //   type: "SEND_EMAIL",
    //   payload: res.data.payload,
    // });

    return res;
  } catch (err) {
    throw err;
  }
};

export const postFormData = (id, ans) => async (dispatch) => {
  const body = {
    prospectId: id,
    answers: ans,
  };
  try {
    const res = await api.post(`forms`, body);
    // dispatch({
    //   type: "SEND_EMAIL",
    //   payload: res.data.payload,
    // });

    return res;
  } catch (err) {
    throw err;
  }
};
