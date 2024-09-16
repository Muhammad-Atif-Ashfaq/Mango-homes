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

export const makeProspectPayment = (body) => async (dispatch) => {
  try {
    const res = await api.post(`propectpayments`, body);

    return res;
  } catch (err) {
    throw err;
  }
};
