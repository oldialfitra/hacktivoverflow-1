import axios from 'axios';

const server = axios.create({
  baseURL: 'http://hacktivoverflow-server.oldialfitra.com',
});

export default server;
