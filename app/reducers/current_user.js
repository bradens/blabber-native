import { AsyncStorage } from 'react-native';

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      AsyncStorage.setItem('username', action.user.username)
      return { ...action.user };
    default:
      return state;
  }
}
