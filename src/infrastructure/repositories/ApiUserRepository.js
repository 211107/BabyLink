import Axios from '../config/apiConfig';

const service = '/authentication/user';
const errorResponse = {error: true, value: {IdUser: 0}};
const url = `${service}`;

const guardar = async user => {
  try {
    const {data} = await Axios.post(`${url}/save`, user);
    return data;
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
  }
};

const login = async (email, password) => {
  try {
    const {data} = await Axios.post(`${url}/login`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return errorResponse;
  }
};

const deletes = async IdUser => {
  try {
    await Axios.delete(`${url}/delete/${IdUser}`);
    return 'Usuario eliminado';
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return errorResponse;
  }
};

const UserService = {
  guardar,
  login,
  deletes,
};

export default UserService;
