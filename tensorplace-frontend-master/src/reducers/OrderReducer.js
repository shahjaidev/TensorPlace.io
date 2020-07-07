import { session } from '../util/session';
import * as orderTypes from '../types/order';
const initialState = { order: {}, orders: {}, success: false };

if (session.getOrder()) {
  initialState.order = session.getOrder();
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderTypes.ADD_ORDER_SESSION:
      return {
        ...state,
        order: action.payload
      };
    case orderTypes.ADD_ORDER:
      return {
        ...state,
        success: true,
        order: action.data
      };
    case orderTypes.REMOVE_ORDER:
      return {
        order: {}
      };
    case orderTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.data,
        success: true,
      };
    case orderTypes.RESET_SUCCESS:
      return {
        ...state,
        success: initialState.success,
      };
    default:
      return state;
  }
}

export const getOrder = (state) => state.order.order;
export const getOrders = (state) => state.order.orders;
export const getOrderSuccess = (state) => state.order.success;

export default OrderReducer;
