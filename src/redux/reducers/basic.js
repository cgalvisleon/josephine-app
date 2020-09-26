import { SCHEME, SET_TOKEN, LOADING, ALERT, ONLINE, SIGNIN, SIGNOUT } from "../actionTypes";

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
    case ONLINE: {
      return {
        ...state,
        online: action.payload
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
        ...SCHEME
      };
    }
    default:
      return state;
  }
}
