// import axios from 'axios';
// import baseURL from '../config/apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Axios from '../config/apiConfig';

const service = '/information-management/pediatrician';

// const url = `${baseURL}${service}`

const listarPediatra = async () => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;

  // const response = await axios({
  //     url:`${url}/list`,
  //     method:"GET",
  // })

  // return response.data
  try {
    const {data} = await Axios.get(`${service}/list`);
  } catch (error) {
    console.error('Error en listar pediatras', error);
  }
};

const buscarPediatra = async fullName => {
  //   let usuario = await AsyncStorage.getItem('usuario');
  //   usuario = JSON.parse(usuario);
  //   const token = usuario.token;

  //   const response = await axios({
  //     url: `${url}/search`,
  //     method: 'POST',
  //     headers: {
  //       token,
  //     },
  //     data: {
  //       fullName,
  //     },
  //   });

  //   return response.data;
  try {
    const {data} = await Axios.post(`${service}/search`, {fullName});
    return data;
  } catch (error) {
    console.error('Error en buscar pediatra', error);
  }
};

const PediatraService = {
  listarPediatra,
  buscarPediatra,
};

export default PediatraService;
