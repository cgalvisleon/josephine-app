import { TALKING } from "../actionTypes";

const initialState = {
  show: "-1"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TALKING: {
      return {
        ...state,
        show: action.payload
      };
    }
    default:
      return state;
  }
}
