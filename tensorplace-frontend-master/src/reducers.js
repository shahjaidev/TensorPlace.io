import { combineReducers } from 'redux';
import registration from './reducers/RegistrationReducer';
import api from './reducers/ApiReducer';
import plugin from './reducers/PluginReducer';
import order from './reducers/OrderReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  registration,
  api,
  plugin,
  order,
});