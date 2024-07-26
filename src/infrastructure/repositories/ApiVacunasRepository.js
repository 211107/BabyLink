// import axios from 'axios';
// import baseURL from '../config/apiConfig';

import Axios from "../config/apiConfig";

// import AsyncStorage from '@react-native-async-storage/async-storage';
const service = '/information-management/vaccines';


// const url = `${baseURL}${service}`;

const listarVacunas = async (IdBaby, IdVaccineGroup) => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/list/by-baby/${IdBaby}/${IdVaccineGroup}`,
  //   method: 'GET',
  //   headers: {
  //     token,
  //   },
  // });
  // return response.data;
  try {
    const {data} = await Axios.get(`${service}/list/by-baby/${IdBaby}/${IdVaccineGroup}`);
    return data;
  } catch (error) {
    console.error('Error en listar vacunas', error);
  }
};

const actualizarDato = async (IdVaccineBaby, itIsApplied) => {

  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/by-baby/update`,
  //   method: 'PUT',
  //   headers: {
  //     token,
  //   },
  //   data: {
  //       IdVaccineBaby,
  //       itIsApplied
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.put(`${service}/by-baby/update`, {
      IdVaccineBaby,
      itIsApplied
    });
    return data;
  } catch (error) {
    console.error('Error en actualizar vacuna', error);
  }
};

const VacunasService = {
  listarVacunas,
  actualizarDato,
};

export default VacunasService;
