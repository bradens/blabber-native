import { LOBBY_ROOM_KEY, SOCKET_SET_NAME } from '../constants';
import Server from '../server';

export const
  SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = (user) => {
  Server.getChannel(LOBBY_ROOM_KEY).push(SOCKET_SET_NAME, { username: user.username });
  return { type: SET_CURRENT_USER, user: user };
}
