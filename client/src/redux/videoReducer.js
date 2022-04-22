// Action types
const UPDATE_VIDEO = 'UPDATE_VIDEO';
const UPDATE_INDEX = 'UPDATE_INDEX';

const initial_state = {
  file: null,
  index: -1,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPDATE_VIDEO:
      return {
        ...state,
        file: action.payload,
      }
    case UPDATE_INDEX:
      return {
        ...state,
        index: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;