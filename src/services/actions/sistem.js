import store from "../store";
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
import { getRow, getValue, dropDown } from "../../components/utilities";
import { Api as Profile } from "../profile";
import { Api as Authentication } from "../authentication";

const loading = payload => ({
  type: LOADING,
  payload
});

const alert = payload => ({
  type: ALERT,
  payload
});

const online = payload => ({
  type: ONLINE,
  payload
});

const setToken = payload => ({
  type: SET_TOKEN,
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

const setProfile = payload => ({
  type: SET_PROFILE,
  payload
});

const setProject = payload => ({
  type: SET_PROJECT,
  payload
});

const setFolders = payload => ({
  type: SET_FOLDERS,
  payload
});

const setFolder = payload => ({
  type: SET_FOLDER,
  payload
});

const setDisplay = payload => ({
  type: SET_DISPLAY,
  payload
});

const setVar = payload => ({
  type: SET_VAR,
  payload
});

const setViewRows = payload => ({
  type: SET_VIEW_ROWS,
  payload
});

function hideAlert() {
  setTimeout(() => {
    const msg = { show: false, message: "", type: "" };
    store.dispatch(alert(msg));
  }, 2000);
}

async function profile() {
  let profile = await Profile.profile().then(result => {
    return result.data;
  });
  let projects = getValue(profile, "projects", []);
  let project = getRow(projects, 0, { _id: "-1", caption: "" });
  let project_id = getValue(project, "_id", "-1");
  let folders = await Profile.folders(project_id).then(result => {
    return result.data;
  });
  let folder = getRow(folders, 0, {});
  folder = getVar(project_id, "folder", folder);
  store.dispatch(setProfile({ profile, project, folders, folder }));
  store.dispatch(signin({}));
}

async function project(item) {
  let project_id = getValue(item, "_id", "-1");
  let folders = await Profile.folders(project_id).then(result => {
    return result.data;
  });
  let folder = getRow(folders, 0, {});
  folder = getVar(project_id, "folder", folder);
  store.dispatch(setProject({ project: item, folders, folder }));
}

async function folders(project_id) {
  let folders = await Profile.folders(project_id).then(result => {
    return result.data;
  });
  store.dispatch(setFolders(folders));
}

async function folder(item) {
  const state = store.getState();
  const project_id = state.sistem.project._id || "-1";
  const folder = item.folder;
  _setVar(project_id, "folder", folder);
  store.dispatch(setFolder(folder));
}

function getVar(_id, _var, _default) {
  const state = store.getState();
  const vars = state.sistem.vars || [];
  const index = vars.findIndex(element => element._id === _id && element.var === _var);
  if (index === -1) {
    return _default;
  } else {
    return vars[index].value;
  }
}

function _setVar(_id, _var, value) {
  const state = store.getState();
  const vars = state.sistem.vars || [];
  const index = vars.findIndex(element => element._id === _id && element.var === _var);
  if (index === -1) {
    vars.push({
      _id,
      var: _var,
      value
    });
  } else {
    vars[index].value = value;
  }
  store.dispatch(setVar(vars));
  return value;
}

export const Actions = {
  loading: async function(tag, count) {
    store.dispatch(loading({ show: true, tag, count }));
  },
  outLoading: async function() {
    store.dispatch(loading({ show: false, tag: "", count: 0 }));
  },
  showAlert: async function(message) {
    const msg = { show: true, message, type: "" };
    store.dispatch(alert(msg));
    hideAlert();
  },
  showDanger: async function(message) {
    const msg = { show: true, message, type: "danger" };
    store.dispatch(alert(msg));
    hideAlert();
  },
  showWarning: async function(message) {
    const msg = { show: true, message, type: "warning" };
    store.dispatch(alert(msg));
    hideAlert();
  },
  showInfo: async function(message) {
    const msg = { show: true, message, type: "info" };
    store.dispatch(alert(msg));
  },
  online: async function(connect) {
    store.dispatch(online(connect));
  },
  signin: async function(username, password) {
    Authentication.signIn(username, password)
      .then(result => {
        if (result.msg === "") {
          const token = result.data;
          console.log(token);
          store.dispatch(setToken(token));
          profile();
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  signout: async function() {
    store.dispatch(signout({}));
  },
  match360: async function(token) {
    console.log(token);
    store.dispatch(setToken(token));
    profile();
  },
  forgot: async function(username, password, confirmation, code) {
    Authentication.forgot(username, password, confirmation, code)
      .then(result => {
        if (result.msg === "") {
          const token = result.data;
          store.dispatch(setToken(token));
          profile();
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  signup: async function(username, password, confirmation, caption, project, module_id, city_id, code) {
    Authentication.signup(username, password, confirmation, caption, project, module_id, city_id, code)
      .then(result => {
        if (result.msg === "") {
          const token = result.data;
          store.dispatch(setToken(token));
          profile();
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  setProfile: async function() {
    profile();
  },
  setProject: async function(item) {
    project(item);
  },
  setFolders: async function(folders) {
    store.dispatch(setFolders(folders));
  },
  setFolder: async function(item) {
    folder(item);
  },
  getFolderDisplay: function(project_id, folder_id) {
    const state = store.getState();
    const display = state.sistem.display || [];
    const index = display.findIndex(element => element.project_id === project_id && element.folder_id === folder_id);
    if (index === -1) {
      return false;
    } else {
      return display[index].display;
    }
  },
  setFolderDisplay: async function(project_id, folder_id, dropdowId) {
    const state = store.getState();
    const display = state.sistem.display || [];
    const index = display.findIndex(element => element.project_id === project_id && element.folder_id === folder_id);
    let displayed = true;
    if (index === -1) {
      display.push({
        project_id,
        folder_id,
        display: displayed
      });
    } else {
      displayed = !display[index].display;
      display[index].display = displayed;
    }
    store.dispatch(setDisplay(display));
    dropDown(dropdowId, displayed);
  },
  updateFolders: function(project_id) {
    folders(project_id);
  },
  getVar: function(_id, _var, _default) {
    return getVar(_id, _var, _default);
  },
  setVar: function(_id, _var, value) {
    return _setVar(_id, _var, value);
  },
  setViewRows: function(rows) {
    return store.dispatch(setViewRows(rows));
  },
  toogleTalking: async function() {
    console.log({ action: "toogleTalking" });
  }
};
