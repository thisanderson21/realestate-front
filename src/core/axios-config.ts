import axios from 'axios';
const axiosIntance = axios.create({
  baseURL: 'http://localhost:5214',
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'es-CO',
    'Content-Language': 'es',
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

export default axiosIntance;
