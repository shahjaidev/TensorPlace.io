import callApi from '../util/apiCaller';
import { apiActions } from './ApiAction';
import * as pluginTypes from '../types/plugin';

import { serialize } from '../util/common';

export function saveSuccess(data) {
  return {
    type: pluginTypes.UPLOAD_NEW_PLUGIN_SUCCESS,
    success: true,
  };
}

export function uploadPluginFailure(data) {
  return {
    type: pluginTypes.UPLOAD_NEW_PLUGIN_FAILURE,
    userErrors: data,
  };
}

export const getUserPlugins = (data) => {
  return {
  type: pluginTypes.GET_PLUGINS,
  data: data,
}};

export const getTopPlugins = (data) => {
  return {
  type: pluginTypes.GET_TOP_PLUGINS,
  data: data,
}};

export const getPlugins = (data) => {
  return {
  type: pluginTypes.GET_ALL_PLUGINS,
  data: data,
}};

export const getPlugin = (data) => {
  return {
  type: pluginTypes.GET_PLUGIN,
  data: data,
}};

export const getSavedPlugin = (data) => {
  return {
  type: pluginTypes.GET_SAVED_PLUGINS,
  data: data.plugins,
}};

export const getRelatedPlugin = (data) => {
  return {
  type: pluginTypes.GET_RELATED_PLUGINS,
  data: data,
}};

export function reviewAddSuccess(data) {
  return {
    type: pluginTypes.ADD_REVIEW,
    success: true,
  };
}

export function getReviews(data) {
  return {
    type: pluginTypes.GET_REVIEWS,
    data: data,
  };
}

export function uploadNewPlugin(pluginData) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('plugin/upload', 'POST', pluginData)
      .then((res) => {
        if (res.data && res.data.success) {
          dispatch(apiActions.success());
          dispatch(saveSuccess(res.data));
        }
      })
      .catch((e) => {
        dispatch(uploadPluginFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export function updatePlugin(pluginData) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('plugin/update', 'POST', pluginData)
      .then((res) => {
        if (res.data && res.status === 200) {
          dispatch(apiActions.success());
          dispatch(saveSuccess(res.data));
          dispatch(getPluginRequest(res.data.plugin.slug));
        }
      })
      .catch((e) => {
        dispatch(uploadPluginFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export const getUserPluginRequest = () => (dispatch) => {
  callApi('plugins', 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getUserPlugins(res.data));
    }
  });
};

export const getTopPluginRequest = () => (dispatch) => {
  callApi('plugins/top', 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getTopPlugins(res.data));
    }
  });
};

export const getAllPlugins = () => (dispatch) => {
  callApi('plugins/all', 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getPlugins(res.data));
    }
  });
};

export const getPluginRequest = (slug) => (dispatch, getState) => {
  callApi(`plugin/${slug}`, 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getPlugin(res.data[0]));
      if(getState().registration.loggedIn) {
        dispatch(getSavedPlugins());
      }
    }
  });
};

export const getRelatedPluginRequest = (slug) => (dispatch) => {
  callApi(`plugins/related/${slug}`, 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getRelatedPlugin(res.data));
    }
  });
};

export const getSearchPlugin = (data) => {
  return {
  type: pluginTypes.GET_SEARCH_PLUGINS,
  data: data,
}};

export const searchPluginRequest = ({
  search = '',
  codebaseFilter = '',
  languageFilter = '',
  priceFilter = '',
  ratingFilter = '',
}) => (dispatch) => {
  const params = {
    search,
    codebaseFilter,
    languageFilter,
    priceFilter,
    ratingFilter,
  };
  const url = `search-plugins?${serialize(params)}`;

  callApi(url).then((res) => {
    if (res.status === 200) {
      dispatch(getSearchPlugin(res.data));
    }
  });
};

export const savePlugin = (slug) => (dispatch) => {
  callApi(`wishlist/plugin/save`, 'post', slug).then((res) => {
    if (res.status === 200) {
      dispatch(saveSuccess(res.data));
      dispatch(getSavedPlugins());
    }
  });
};

export const removePlugin = (slug) => (dispatch) => {
  callApi(`wishlist/plugin/remove`, 'put', slug).then((res) => {
    if (res.status === 200) {
      dispatch(saveSuccess(res.data));
      dispatch(getSavedPlugins());
    }
  });
};

export const getSavedPlugins = () => (dispatch) => {
  callApi(`wishlist`, 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getSavedPlugin(res.data));
    }
  });
}

export function addPluginReview(reviewData) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('plugin/review/add', 'POST', reviewData)
      .then((res) => {
        if (res.data.success) {
          dispatch(apiActions.success());
          dispatch(reviewAddSuccess(res.data));
        }
      })
      .catch((e) => {
        dispatch(uploadPluginFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export const getPluginReviews = (slug) => (dispatch) => {
  callApi(`plugin/review/${slug}`, 'get').then((res) => {
    if (res.status === 200) {
      dispatch(getReviews(res.data));
    }
  });
};

export function sendPluginDeveloperEmail(contactData) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('plugins/support', 'POST', contactData)
      .then((res) => {
        if (res.data && res.status === 200) {
          dispatch(apiActions.success());
          dispatch(saveSuccess());
        }
      })
      .catch((e) => {
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export function resetSuccess() {
  return { type: pluginTypes.RESET_SUCCESS };
}