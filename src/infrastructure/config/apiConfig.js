import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE = 'https://babylink.liosftwr.space/api-baby-link';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ?? null;
};

const Axios = axios.create({
  baseURL: API_BASE,
});

Axios.interceptors.request.use(
  async config => {
    if (!config.headers) {
      config.headers = {};
    }
    const token = await getToken();
    if (token) {
      config.headers.token = token;
    }

    console.log(API_BASE + config.url);

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default Axios;
