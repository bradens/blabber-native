import uuid from 'uuid';
import _ from 'lodash';
import { Socket, LongPoller } from './vendor/phoenix';
import { default as constants } from './constants';
import { CONNECT_USERS, DISCONNECT_USERS, SET_USERNAME } from './actions/user';
import { SET_CURRENT_USER } from './actions/current_user';
import { RECEIVE_MESSAGES } from './actions/message';
import { AsyncStorage } from 'react-native';

const { LOBBY_ROOM_KEY, BLABBER_ADDRESS, SOCKET_NEW_MSG } = constants;

export default class Server {
  // Store a reference to the....store
  static store = null

  // Currently subscribed channels
  static channels = { }

  static init(store) {
    this.store = store;
    let username, user_id;

    // store a user id (NOT SAFE FOR A REAL APP)
    AsyncStorage
      .getItem('user_id')
      .then(val => {
        if (val) {
          user_id = val
        } else {
          user_id = uuid();
          AsyncStorage.setItem('user_id', user_id)
        }
      })
      .then(() => AsyncStorage.getItem('username'))
      .then(val => {
        username = val
      })
      .then(() => {
        console.log(`done setup with user_id: ${user_id} and username: ${username}`);

        let socket = new Socket(`ws://${BLABBER_ADDRESS}/socket`, {
          logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
        })

        let connectObj = {
          user_id: user_id
        }

        if (username)
          connectObj['username'] = username;

        socket.connect(connectObj)

        socket.onOpen( ev => console.log('OPEN', ev) )
        socket.onError( ev => console.log('ERROR', ev) )
        socket.onClose( e => console.log('CLOSE', e))

        let lobbyChannel = socket.channel(LOBBY_ROOM_KEY, {})

        this.channels[LOBBY_ROOM_KEY] = lobbyChannel;

        lobbyChannel
          .join()
          .receive('ignore', () => console.log('auth error'))
          .receive('ok', (params) => {
            console.log('Back from join with params: ', params);
            // Issue a update users action with the user list
            store.dispatch({ type: SET_CURRENT_USER, user: params.currentUser });
            store.dispatch({ type: CONNECT_USERS, users: _.values(params.users) })
            store.dispatch({ type: RECEIVE_MESSAGES, messages: params.messages })
          })

        lobbyChannel.onError(e => console.log('something went wrong', e))
        lobbyChannel.onClose(e => console.log('lobbyChannel closed', e))

        // Show new users in the list
        lobbyChannel.on('user:entered', msg => {
          let user = this.sanitize(msg.user || 'anonymous');
          if (msg.user_id === socket.params.user_id) return;
          store.dispatch({ type: CONNECT_USERS, users: [ { user_id: msg.user_id, username: user } ] });
        });

        lobbyChannel.on('set:username', msg => {
          store.dispatch({ type: SET_USERNAME, user: msg.user });
        });

        lobbyChannel.on('user:left', msg => {
          store.dispatch({ type: DISCONNECT_USERS, user_id: msg.user_id });
        });

        // Dispatch new messages to the stores
        lobbyChannel.on(SOCKET_NEW_MSG, msg => {
          msg.user = msg.user || 'anonymous';
          store.dispatch({ type: RECEIVE_MESSAGES, messages: [msg]});
      });
   });
  }

  // Returns the channel object for a key
  static getChannel(key) {
    return this.channels[key]
  }

  static sanitize(html) {
    return html
  }
}
