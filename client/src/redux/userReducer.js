// Action types
const UPDATE_USER_INDEX = 'UPDATE_USER_INDEX';

const initial_state = {
  userIndex: parseInt(window.localStorage.getItem('User Index'))
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPDATE_USER_INDEX:
      return {
        ...state,
        userIndex: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;