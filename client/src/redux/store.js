import { combineReducers, createStore } from 'redux';
import videoReducer from './videoReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  videoSlice: videoReducer,
  userSlice: userReducer,
});

const store = createStore(rootReducer);
export default store;