import axios from 'axios';
import  AsyncStorage  from '@react-native-community/async-storage';

const http = axios.create({
  baseURL: 'https://apibarbearia.herokuapp.com/api/v1/',
});



http.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = "Bearer "+token;
  }
  return config;
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
