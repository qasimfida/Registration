import axios from 'axios';

const http = axios.create({
  baseURL: 'https://hola.thelead.one/api',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

export default http