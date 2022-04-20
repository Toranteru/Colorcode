// Action types
const UPDATE_VIDEO = 'UPDATE_VIDEO';

const initial_state = {
  file: null,
  intervalID: null,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPDATE_VIDEO:
      return {
        ...state,
        file: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;