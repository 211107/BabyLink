import Axios from '../config/apiConfig';
const service = '/information-management/feeding';

const guardar = async feeding => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;

  // const response = await axios({
  //   url: `${url}/save`,
  //   method: 'POST',
  //   headers: {
  //     token,
  //   },
  //   data: {
  //     feeding,
  //   },
  // });

  // return response.data;

  try {
    const {data} = await Axios.post(`${service}/save`, {feeding});
    return data;
  } catch (error) {
    console.log('Error al guardar la alimentacion:', error);
  }
};

const actualizar = async feeding => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/save`,
  //   method: 'update',
  //   headers: {
  //     token,
  //   },
  //   data: {
  //     feeding,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.put(`${service}/update`, {feeding});
    return data;
  } catch (error) {
    console.log('Error al actualizar la alimentacion:', error);
  }
};

const list = async IdBaby => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/list/${IdBaby}`,
  //   method: 'GET',
  //   headers: {
  //     token,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.get(`${service}/list/${IdBaby}`);
    return data;
  } catch (error) {
    console.log('Error al listar la alimentacion:', error);
  }
};

const deletes = async IdFeeding => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // usuario = JSON.parse(usuario);
  // const token = usuario.token;
  // const response = await axios({
  //   url: `${url}/delete/${IdFeeding}`,
  //   method: 'DELETE',
  //   headers: {
  //     token,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.delete(`${service}/delete/${IdFeeding}`);
    return data;
  } catch (error) {
    console.log('Error al eliminar la alimentacion:', error);
  }
};

const AlimentacionService = {
  guardar,
  list,
  actualizar,
  deletes,
};

export default AlimentacionService;
