import { SET_SLOPE } from "../actionTypes";

const initialState = {
  slope: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SLOPE: {
      return {
        ...state,
        slope: action.payload
      };
    }
    default:
      return state;
  }
}
