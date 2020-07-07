import callApi from '../util/apiCaller';
import { apiActions } from './ApiAction';
import * as orderTypes from '../types/order';

export function saveOrderInSession(orderDetail) {
  return dispatch => {
    dispatch({ type: orderTypes.ADD_ORDER_SESSION, payload: orderDetail });
  };
}

export function removeOrder() {
  return dispatch => {
    dispatch({ type: orderTypes.REMOVE_ORDER });
  };
}

export const addOrderSuccess = (data) => {
  return {
  type: orderTypes.ADD_ORDER,
  data: data,
}};

export const getOrders = (data) => {
  return {
  type: orderTypes.GET_ORDERS,
  data: data,
}};


export function addOrder(orderData) {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('order/add', 'POST', orderData)
      .then((res) => {
        if (res.data && res.data.success) {
          dispatch(apiActions.success());
          dispatch(addOrderSuccess(res.data));
        }
      })
      .catch((e) => {
        // dispatch(uploadPluginFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export function getOrdersRequest() {
  return (dispatch) => {
    dispatch(apiActions.request());
    return callApi('orders', 'GET')
      .then((res) => {
        if (res.data) {
          dispatch(apiActions.success());
          dispatch(getOrders(res.data));
        }
      })
      .catch((e) => {
        // dispatch(uploadPluginFailure(e));
        dispatch(apiActions.failure(e.toString()));
      });
  };
}

export function resetSuccess() {
  return { type: orderTypes.RESET_SUCCESS };
}