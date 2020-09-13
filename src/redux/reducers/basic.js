import { SET_TOKEN, LOADING, ALERT, SIGNIN, SIGNOUT } from "../actionTypes";

export default function basic(state, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }
    case ALERT: {
      return {
        ...state,
        alert: action.payload
      };
    }
    case SIGNIN: {
      return {
        ...state,
        signin: true
      };
    }
    case SIGNOUT: {
      return {
        ...state,
        signin: false
      };
    }
    default:
      return state;
  }
}
