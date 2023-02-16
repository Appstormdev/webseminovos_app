import axios, { Method } from "axios";

import { API_URL } from "@env";
import { AppError } from "@utils/AppError";
import { getStorageAuthToken } from "@storage/storageAuthToken";

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

type IApi = {
  method?: Method;
  url: string;
  body?: {};
  headers?: {};
  onProcessing?: (processing: boolean) => void;
  onSuccess?: (res: any) => void;
  onError?: (error: any) => void;
};

export async function _api(
  method: Method,
  endpoint: string,
  params?: {},
  headers?: {}
) {
  const token = getStorageAuthToken();
  const response = await axios({
    baseURL: API_URL,
    url: endpoint,
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data: params,
  });

  const { data } = response;
  return data;
}

export async function fetchApi({
  method,
  url,
  body,
  headers,
  onProcessing,
  onError,
  onSuccess,
}: IApi) {
  try {
    onProcessing && onProcessing(true);
    const res = await _api(method || "get", url, body, headers);

    if (res.error) {
      console.error(`API resquest error (${url}) => `, res.error);
      throw new Error(res.error?.message || res.error);
    }

    onSuccess && onSuccess(res);
    onProcessing && onProcessing(false);
  } catch (error: any) {
    onProcessing && onProcessing(false);

    if (onError) {
      if (error.message) return onError(error);
      const responseError = error.response?.request._response;
      const parsedError = responseError && JSON.parse(responseError);
      onError(parsedError?.error);
    }
  }
}
