import { combineReducers, createStore } from 'redux';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  videoSlice: videoReducer,
});

const store = createStore(rootReducer);
export default store;