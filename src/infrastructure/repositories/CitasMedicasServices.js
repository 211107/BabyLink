import Axios from '../config/apiConfig';
const service = '/community/medical-appointment';

const guardar = async medicalAppointment => {
  console.log('Guardando cita medica');
  // try {
  //   let usuario = await AsyncStorage.getItem('usuario');
  //   usuario = JSON.parse(usuario);
  //   const token = usuario.token;
  //   console.log({medicalAppointment});
  //   const response = await axios({
  //     url: `${url}/save`,
  //     method: 'POST',
  //     headers: {
  //       token,
  //     },
  //     data: {
  //       medicalAppointment,
  //     },
  //   });
  //   console.log(response.data);
  //   return response.data;
  // } catch (error) {
  //   // console.log({error});
  // }
  try {
    const {data} = await Axios.post(`${service}/save`, medicalAppointment);
    return data;
  } catch (error) {
    console.error('Error en guardar cita medica', error);
  }
};

const list = async IdBaby => {
  //llamar al storage del bebe

  // try {
  //   let usuario = await AsyncStorage.getItem('usuario');
  //   usuario = JSON.parse(usuario);
  //   const token = usuario.token;
  //   console.log('Listnado');
  //   let response;
  //   console.log({url: `${url}/list/${IdBaby}`});
  //   response = await axios({
  //     url: `${url}/list/${IdBaby}`,
  //     method: 'GET',
  //     headers: {
  //       token,
  //     },
  //   });
  //   console.log(response.data.value)
  //   return response.data;
  // } catch (error) {
  //   // console.log({error});
  // }
  try {
    const {data} = await Axios.get(`${service}/list/${IdBaby}`);
    return data;
  } catch (error) {
    console.error('Error en listar citas medicas', error);
  }
};

const deletes = async id => {
  // let usuario = await AsyncStorage.getItem('usuario');
  // const token = usuario.token;

  // const response = await axios({
  //   url: `${url}/delete/${id}`,
  //   method: 'DELETE',
  //   headers: {
  //     token,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.delete(`${service}/delete/${id}`);
    return data;
  } catch (error) {
    console.error('Error en eliminar cita medica', error);
  }
};

const CitasMedicasServices = {
  guardar,
  list,
  deletes,
};

export default CitasMedicasServices;
