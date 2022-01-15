import axios from "axios";
import config from './config';

import { getCookie, deleteAllCookies } from '../utils';

const api = axios.create();

api.interceptors.request.use(
  request => {
    let baseURL = config.API_BASE_URL || '';
    request.url = baseURL + request.url;

    let userInfo = getCookie('userInfo');
    if (userInfo) {
      let token = JSON.parse(userInfo).access_token;
      request.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      };
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.data?.detail === 'Signature has expired') {
      deleteAllCookies();
      document.location.href = '/auth';
    }

    return Promise.reject(error);
  }
);

export default api;