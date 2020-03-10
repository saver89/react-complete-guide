import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, od: action.id };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return { ...state, loading: false, purchased: false };
    case actionTypes.PURCHASE_BURGER_START:
      return { ...state, loading: true };
    case actionTypes.PURCHASE_INIT:
      return { ...state, purchased: false };
    default:
      return state;
  }
};

export default reducer;
