import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://69c48d4d8a5b6e2dec2acae8.mockapi.io/',
  timeout: 10000,
});

export default axiosInstance;