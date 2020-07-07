import * as pluginTypes from '../types/plugin';
import { initialState } from '../models/plugin';

const PluginReducer = (state = initialState, action) => {
  switch (action.type) {
    case pluginTypes.UPLOAD_NEW_PLUGIN_SUCCESS:
      return {
        ...state,
        success: action.success,
      };
    case pluginTypes.UPLOAD_NEW_PLUGIN_FAILURE:
      return {
        ...state,
        success: false,
      };
    case pluginTypes.GET_PLUGINS:
      return {
        ...state,
        userplugins: action.data,
      };
    case pluginTypes.GET_ALL_PLUGINS:
      return {
        ...state,
        plugins: action.data,
      };
    case pluginTypes.GET_TOP_PLUGINS:
      return {
        ...state,
        topPlugins: action.data,
      };
    case pluginTypes.GET_PLUGIN:
      return {
        ...state,
        pluginDetail: action.data,
      };
    case pluginTypes.GET_SAVED_PLUGINS:
      return {
        ...state,
        savedPlugin: action.data,
      };
    case pluginTypes.GET_SEARCH_PLUGINS:
      return {
        ...state,
        searchPlugin: action.data,
        pluginDetail: {},
      };
    case pluginTypes.GET_RELATED_PLUGINS:
      return {
        ...state,
        relatedPlugins: action.data,
      };
    case pluginTypes.ADD_REVIEW:
      return {
        ...state,
        success: action.success,
      };
    case pluginTypes.GET_REVIEWS:
      return {
        ...state,
        reviews: action.data,
      };
    case pluginTypes.RESET_SUCCESS:
      return {
        ...state,
        success: initialState.success,
      };
    default:
      return state;
  }
};

//export const getCurrentUser = (state) => state.registration.currentUser;
export const getSuccess = (state) => state.plugin.success;
export const getUserPlugins = (state) => state.plugin.userplugins;
export const getPlugins = (state) => state.plugin.plugins;
export const getTopPlugins = (state) => state.plugin.topPlugins;
export const getSavedPlugin = (state) => state.plugin.savedPlugin;
export const getSearchPlugin = (state) => state.plugin.searchPlugin;
export const getRelatedPlugin = (state) => state.plugin.relatedPlugins;
export const getPluginDetail = (state) => state.plugin.pluginDetail;
export const getReviews = (state) => state.plugin.reviews;

export default PluginReducer;
