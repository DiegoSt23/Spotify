/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

const configureApiRequest = <T>(
  axiosRequestConfig: AxiosRequestConfig<T>,
  isLastFm: boolean = false
): AxiosRequestConfig<T> => {
  const accessToken = Cookies.get('token') || '';

  axiosRequestConfig.headers = {
    ...axiosRequestConfig.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  if (isLastFm) {
    axiosRequestConfig.baseURL = 'https://ws.audioscrobbler.com/2.0';
  }

  return axiosRequestConfig;
};

export const Api = {
  get: async <T>(url: string, isLastFm: boolean = false): Promise<T> => {
    const config = configureApiRequest({}, isLastFm);
    const { data } = await axiosInstance.get<T>(url, config);
    return data;
  },

  post: async <T>(url: string, body: Record<string, any>): Promise<T> => {
    const config = configureApiRequest({});
    const { data } = await axiosInstance.post<T>(url, body, config);
    return data;
  },

  put: async <T>(url: string, body: Record<string, any>): Promise<T> => {
    const config = configureApiRequest({});
    const { data } = await axiosInstance.put<T>(url, body, config);
    return data;
  },

  patch: async <T>(url: string, body: Record<string, any>): Promise<T> => {
    const config = configureApiRequest({});
    const { data } = await axiosInstance.patch<T>(url, body, config);
    return data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const config = configureApiRequest({});
    const { data } = await axiosInstance.delete<T>(url, config);
    return data;
  },
};
