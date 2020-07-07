import axios from 'axios';
import { fetchAuthToken } from './auth';

function endpointMatch(endpoint, directory) {
  return !!endpoint.match(directory);
}

const redirectToLoginPage = () => {
  if (window.location.href.includes('signup')) return;
};

export function ApiErrorException(response) {
  this.name = 'ApiErrorException';
  this.response = response;
}

export default function callApi(endpoint, method = 'GET', body = {}, options = {
  node_url: false,
}, headerOverride = {}, cancelToken) {
  /**
   * All the following bs attempts to form a request payload that the various endpoints are expecting...
   */
  let data = body;

  const authToken = fetchAuthToken();

  method = method.toLowerCase();

  //let url = 'http://localhost:5000';
  //let url = 'http://52.117.46.22:5000';
  let url = 'https://node.tensorplace.io';

  url = `${url}/${endpoint}`;

  const defaultHeaders = {
    Accept: 'application/json',
    Authorization: !endpointMatch(endpoint, 'login') ? `${authToken}` : null,
    'Content-Type': 'application/json',
    'X-Key-Inflection': 'camel',
    timeout: 3000,
  };

  const headers = Object.assign(defaultHeaders, headerOverride);

  return axios({
    method, url, headers, data, cancelToken,
  }).catch((error) => {
    if (axios.isCancel(error)) {
      return { cancelled: true };
    }

    if (error.response.status === 500) {
      return Promise.reject(new ApiErrorException(error.response));
    }

    if (error.response.status === 401 && !window.location.href.includes('/signin')) {
      redirectToLoginPage();
    }
    return error.response;
  });
}

/**
 * temporary monkeypatch for API responses which erroneously return data wrapped in a 'data' object.
 * @param data
 * @returns {*}
 */
export const unWrapIfWrapped = (data) => {
  if (Object.prototype.hasOwnProperty.call(data, 'data')) {
    return data.data;
  }

  console.warn('non-essential unwrapper used!', data);
  return data;
};
