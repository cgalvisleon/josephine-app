export const KEY_STORAGE = "DPLOY_APP";
export const SET_TOKEN = "SET_TOKEN";
export const LOADING = "LOADING";
export const ALERT = "ALERT";
export const INIT = "INIT";
export const ONLINE = "ONLINE";
export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNIN";
export const SET_PROJECT = "SET_PROJECT";
export const SET_FOLDER = "SET_FOLDER";

export const SCHEME = {
  online: true,
  signin: false,
  loading: {
    show: false,
    tag: ""
  },
  alert: {
    show: false,
    message: "",
    type: ""
  },
  token: "",
  profile: {},
  folders: []
};
