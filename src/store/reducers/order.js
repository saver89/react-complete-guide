import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, { loading: false, purchased: false });
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const fecthOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
}

const fetchOredersFailed = (state, action) => {
  return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state,action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fecthOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOredersFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
