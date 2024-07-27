import Axios from '../config/apiConfig';
const service = '/community/medical-appointment';

const guardar = async medicalAppointment => {
  console.log('Guardando cita medica');
  try {
    const {data} = await Axios.post(`${service}/save`, {medicalAppointment});
    return data;
  } catch (error) {
    console.error('Error en guardar cita medica', error);
  }
};

const list = async IdBaby => {
  try {
    const {data} = await Axios.get(`${service}/list/${IdBaby}`);
    return data;
  } catch (error) {
    console.error('Error en listar citas medicas', error);
  }
};

const deletes = async id => {
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
