import { AppError } from "@utils/AppError";
import { API_URL } from "@env";
import axios from "axios";

//substituir por application/json
export const apiMultiForm = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
  },
});

apiMultiForm.interceptors.response.use(
  (response) => {
    if (response.data.status === "ERROR") {
      return Promise.reject(new AppError(response.data.status_txt));
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);
