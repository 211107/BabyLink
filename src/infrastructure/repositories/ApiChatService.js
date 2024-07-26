import Axios from '../config/apiConfig';

const service = '/community/chat';

const list = async user => {
  // const response = await axios({
  //   url: `${url}/list`,
  //   method: 'GET',
  // });

  // return response.data;
  try {
    const {data} = await Axios.get(`${service}/list/${user}`);
    return data;
  } catch (error) {
    console.log('Error al listar los chats:', error);
  }
};

const send = async chat => {
  // const response = await axios({
  //   url: `${url}/save`,
  //   method: 'POST',
  //   data: {
  //     chat,
  //   },
  // });

  // return response.data;
  try {
    const {data} = await Axios.post(`${service}/save`, chat);
    return data;
  } catch (error) {
    console.log('Error al enviar el mensaje:', error);
  }
};

const ChatService = {
  list,
  send,
};

export default ChatService;
