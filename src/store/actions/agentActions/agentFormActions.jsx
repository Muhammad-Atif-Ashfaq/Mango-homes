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
export const getAgentForms = (status, id) => async (dispatch) => {
  try {
    const res = await api.get(`forms?status[]=${status}&agentId=${id}`);
    // dispatch({
    //   type: "SEND_EMAIL",
    //   payload: res.data.payload,
    // });

    return res;
  } catch (err) {
    throw err;
  }
};
export const sendAgentRequest = (body) => async (dispatch) => {
  try {
    const res = await api.post(`condos`, body);
    // dispatch({
    //   type: "SEND_EMAIL",
    //   payload: res.data.payload,
    // });

    return res;
  } catch (err) {
    throw err;
  }
};
export const uploadFormImages = (images) => async (dispatch) => {
  try {
    const res = await api.post(`upload/images`, images);
    return res;
  } catch (err) {
    throw err;
  }
};
export const uploadFormVideo = (images) => async (dispatch) => {
  try {
    const res = await api.post(`upload/video`, images);
    return res;
  } catch (err) {
    throw err;
  }
};
export const getLikedListings = (agent_id) => async (dispatch) => {
  try {
    const res = await api.get(
      `condos?status[]=approved&agentId=${agent_id}&view=chat&user_id=${agent_id}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const destroyAgentRequest = (agent_id, form_id) => async (dispatch) => {
  try {
    const res = await api.post(
      `forms/agent_destroy?agentId=${agent_id}&formId=${form_id}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};
