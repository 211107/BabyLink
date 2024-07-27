import Axios from '../config/apiConfig';

const service = '/information-management/dream';

const guardar = async dream => {
  try {
    const {data} = await Axios.post(`${service}/save`, {dream});
    return data;
  } catch (error) {
    console.error('Error en guardar sueño', error);
    return {value: []};
  }
};

const list = async IdBaby => {
  try {
    const {data} = await Axios.get(`${service}/list/${IdBaby}`);
    return data;
  } catch (error) {
    // console.error('Error en listar sueños', error);
    return {value: []};
  }
};

const deletes = async IdDream => {
  try {
    const {data} = await Axios.delete(`${service}/delete/${IdDream}`);
    return data;
  } catch (error) {
    console.error('Error en eliminar sueño', error);
  }
};

const update = async IdDream => {
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
