import store from "../store";
import { SET_SLOPE } from "../actionTypes";

const setSlope = payload => ({
  type: SET_SLOPE,
  payload
});

export const Actions = {
  slope: async function() {
    const state = store.getState();
    return state.stock.slope;
  },
  setSlope: async function(values) {
    store.dispatch(setSlope(values));
  }
};
