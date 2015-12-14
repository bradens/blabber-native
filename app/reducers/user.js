import _ from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      let user = action.user
      return [ { ...user }, ..._.reject(state, (u) => u.user_id === action.user.user_id) ]
    case 'DISCONNECT_USERS':
      return _.reject(state, (u) => u.user_id === action.user_id)
    case 'CONNECT_USERS':
      return [ ...state, ...action.users ]
    default:
      return state;
  }
}
