import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5135/api',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
});

export default api;