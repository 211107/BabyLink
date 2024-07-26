// import axios from 'axios';
// import baseURL from '../config/apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Axios from "../config/apiConfig";

const service = '/information-management/dream';

// const url = `${baseURL}${service}`;

const guardar = async dream => {
  // try {
  //   let usuario = await AsyncStorage.getItem('usuario');
  //   usuario = JSON.parse(usuario);
  //   const token = usuario.token;
  //   const response = await axios({
  //     url: `${url}/save`,
  //     method: 'POST',
  //     headers: {
  //       token,
  //     },
  //     data: {
  //       dream,
  //     },
  //   });

  //   return response.data;
  // } catch (error) {
  //   console.log({error});
  //   return {value: []};
  // }
  try {
    const {data} = await Axios.post(`${service}/save`, dream);
    return data;
  } catch (error) {
    console.error('Error en guardar sueño', error);
    return {value: []};
  }
};

const list = async IdBaby => {
  // console.log('Listando sueño');
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // let response;
  // console.log({url: `${url}/list/${IdBaby}`});
  // try {
  //   response = await axios({
  //     url: `${url}/list/${IdBaby}`,
  //     method: 'GET',
  //     headers: {
  //       token,
  //     },
  //   });
  // } catch (error) {
  //   console.log({error});
  //   response = {
  //     value: [],
  //   };
  // }
  // console.log(response.data);
  // return response.data;
  try {
    const {data} = await Axios.get(`${service}/list/${IdBaby}`);
    return data;
  } catch (error) {
    console.error('Error en listar sueños', error);
    return {value: []};
  }
};

const deletes = async IdDream => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/delete/${IdDream}`,
  //   method: 'DELETE',
  //   headers: {
  //     token,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.delete(`${service}/delete/${IdDream}`);
    return data;
  } catch (error) {
    console.error('Error en eliminar sueño', error);
  }
};

const update = async IdDream => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/update/${IdDream}`,
  //   method: 'PUT',
  //   headers: {
  //     token,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.put(`${service}/update/${IdDream}`);
    return data;
  } catch (error) {
    console.error('Error en actualizar sueño', error);
  }
};

const DreamService = {
  guardar,
  list,
  deletes,
  update,
};

export default DreamService;