import Axios from '../config/apiConfig';
const service = '/information-management/baby';

const guardar = async baby => {
  try {
    const {data} = await Axios.post(`${service}/save`, {
      baby: baby,
    });
    return data;
  } catch (error) {
    console.error('Error al guardar el bebe:', error);
  }
};

const getBabyById = async IdUser => {
  try {
    const {data} = await Axios.get(`${service}/get/${IdUser}`);
    return data;
  } catch (error) {
    console.error('Error al obtener el bebe:', error);
  }
};

const actualizar = async (baby) => {
  try {
    const {data} = await Axios.post(`${service}/save`, {
      baby: baby,
    });
    return data;
  } catch (error) {
    console.error('Error al actualizar el bebe:', error);
  }
};

const BabyService = {
  guardar,
  getBabyById,
  actualizar,
};

export default BabyService;
