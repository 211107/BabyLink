import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE = 'https://babylink.liosftwr.space/api-baby-link';

const getToken = async () => {
  const usuario = await AsyncStorage.getItem('usuario');
  const token = JSON.parse(usuario).token;
  return token ?? null;
}

const Axios = axios.create({
  baseURL: API_BASE,
});

Axios.interceptors.request.use(
  async config => {
    
    if(!config.headers) {
      config.headers = {};
    }

    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    console.log(API_BASE + config.url);

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default Axios;
