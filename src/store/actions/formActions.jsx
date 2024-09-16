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

export const getProspectForms = (id) => async (dispatch) => {
  try {
    const res = await api.get(
      `condos?status[]=approved&prospectId=${id}&view=list&user_id=${id}`
    );
    dispatch({
      type: "GET_FORM_PROSPECT",
      payload: res.data.payload,
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const disLikeForm = (body) => async (dispatch) => {
  try {
    const res = await api.post(`condolikes`, body);
    dispatch({
      type: "GET_FORM_PROSPECT",
      payload: res.data.payload,
    });

    return res;
  } catch (err) {
    throw err;
  }
};
