import {
  LOADING,
  ALERT,
  ONLINE,
  SET_TOKEN,
  SIGNIN,
  SIGNOUT,
  SET_PROFILE,
  SET_PROJECT,
  SET_FOLDERS,
  SET_FOLDER,
  SET_DISPLAY,
  SET_VAR,
  SET_VIEW_ROWS
} from "../actionTypes";

const initialState = {
  online: true,
  signin: false,
  token: "",
  loading: {
    show: false,
    tag: "",
    count: 0
  },
  alert: {
    show: false,
    message: "",
    type: ""
  },
  profile: {
    _id: "-1",
    projects: []
  },
  project: {
    _id: "-1",
    caption: ""
  },
  folders: [],
  folder: {},
  display: [],
  vars: [],
  view_rows: 30
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token
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
        signin: false,
        token: "",
        profile: {
          projects: []
        },
        project: {
          _id: "-1",
          caption: ""
        },
        folders: [],
        folder: {},
        view: {},
        indexFolder: 0
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SET_PROJECT: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SET_FOLDERS: {
      return {
        ...state,
        folders: action.payload
      };
    }
    case SET_FOLDER: {
      return {
        ...state,
        folder: action.payload
      };
    }
    case SET_DISPLAY: {
      return {
        ...state,
        display: action.payload
      };
    }
    case SET_VAR: {
      return {
        ...state,
        vars: action.payload
      };
    }
    case SET_VIEW_ROWS: {
      return {
        ...state,
        view_rows: action.payload
      };
    }
    default:
      return state;
  }
}
