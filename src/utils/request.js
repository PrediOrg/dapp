import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import { debounce } from 'throttle-debounce';
import {baseURL} from "@/config/constants";

const clearCacheEnterLogin = debounce(500, () => {
  location.reload(); //logout
});

const errorMessage = debounce(500, (message) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(errorMessage);
  } else {
    notification.error({
      message: message,
      duration: 5,
    });
  }
});

axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const service = axios.create({
  baseURL,
  timeout: 600000,
});

service.interceptors.request.use(
  (config) => {
    if (config.data === undefined || config.data === null) {
      config.data = {};
    }
    return config;
  },
  (error) => {
    console.log('configerror', error);
    // Do something with request error
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status === 200 && response.config.responseType === 'blob') {
      if (response.headers['content-disposition'] || (response.headers['content-type'] && response.headers['content-type'].indexOf('application/pdf') != -1)) {
        return response;
      } else {
        const resultBlob = new Blob([response.data], { type: 'application/json' });
        const fr = new FileReader();
        fr.onload = function () {};
        fr.readAsText(resultBlob);
      }
    } else if (response.status === 200) {
      return res;
    } else {
      errorMessage(res.message);
      return Promise.reject(res);
    }
  },
  (err) => {
    if (err === undefined || err.code === 'ECONNABORTED') {
      errorMessage('Response Timeout');
      return Promise.reject(err);
    }
    err.response = err.response || {};
    const status = err.response.status;
    switch (status) {
      case 400:
      case 404:
      case 406:
      case 410:
      case 422:
        // errorMessage('Response Error')
        break;
      case 401:
      case 403:
        clearCacheEnterLogin();
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        // errorMessage('Server Error');
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

export default service;
