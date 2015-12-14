export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_MESSAGES':
      return [...state, ...action.messages];
    default:
      return state;
  }
}
