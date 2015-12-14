import { LOBBY_ROOM_KEY, SOCKET_NEW_MSG } from '../constants';
import Server from '../server';

export const
  RECEIVE_MESSAGES = 'RECEIVE_MESSAGES',
  SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessage = (user, message) => {
  let msg = { user: user, body: message };
  // Send message to the server
  Server.getChannel(LOBBY_ROOM_KEY).push(SOCKET_NEW_MSG, msg);

  return (dispatch) => {
    dispatch({
      type: SEND_MESSAGE,
      message: msg
    });
  };
}
