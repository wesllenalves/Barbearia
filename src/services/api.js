import axios from 'axios';

const http = axios.create({
  baseURL: 'https://apibarbearia.herokuapp.com/api/v1/',
});



const api = async (method, endpoint, data = {}, params = {}, headers = {}) => {
  const url = endpoint;
  return http
    .request({
      method,
      url,
      data,
      params,
      headers,
    })
    .then(response => response)
    .catch(error => error.response);
};

export default api;

export { http };
