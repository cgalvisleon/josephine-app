import store from "../store";
import { genId } from "../../components/utilities";
import { LOADING, ALERT, INIT, SIGNIN, SIGNOUT, SET_PROJECT, SET_FOLDER } from "../actionTypes";

function removeStorage() {
  localStorage.removeItem(KEY_STORAGE);
}

const loading = payload => ({
  type: LOADING,
  payload
});

const alert = payload => ({
  type: ALERT,
  payload
});

const init = payload => ({
  type: INIT,
  payload
});

const signin = payload => ({
  type: SIGNIN,
  payload
});

const signout = payload => ({
  type: SIGNOUT,
  payload
});

const setProject = payload => ({
  type: SET_PROJECT,
  payload
});

const setFolder = payload => ({
  type: SET_FOLDER,
  payload
});

export const Actions = {
  loading: async function(show, tag) {
    store.dispatch(loading({ show, tag }));
  },
  alert: async function(msg) {
    store.dispatch(alert(msg));
  },
  init: async function() {
    store.dispatch(init({}));
  },
  signin: async function(username, password) {},
  signout: async function() {},
  setProject: async function() {},
  setFolder: async function() {}
};
