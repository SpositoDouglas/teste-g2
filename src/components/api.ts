import axios from 'axios';

const api = axios.create({
  baseURL: 'https://673bc1fd96b8dcd5f3f75c80.mockapi.io/mockapi',
});

export default api;
