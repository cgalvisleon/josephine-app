import { http } from "../components/http";
import {
  isOnLine,
  ShowAlert,
  getVar,
  ShowOffLine,
  setProfile,
  setProject,
  setFolder,
  setFolders,
  getProfile,
  getProject,
  getFolder,
  getFolders,
  getValue,
  getItem
} from "../components/utilities";

export const Api = {
  profile: async function() {
    if (!isOnLine) {
      const profile = getProfile();
      const projects = getValue(profile, "projects", []);
      const project = getProject(getItem(projects, 0));
      const project_id = getValue(project, "_id", "-1");
      return {
        msg: "",
        message: "",
        data: { profile, projects, project, project_id }
      };
    } else {
      return await http("GET", "profile")
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
            return result;
          } else {
            const profile = getValue(result, "data", {});
            const projects = getValue(profile, "projects", []);
            const project = getProject(getItem(projects, 0));
            const project_id = getValue(project, "_id", "-1");
            setProfile(profile);
            setProject(project);
            return {
              msg: "",
              message: "",
              data: { profile, projects, project, project_id }
            };
          }
        })
        .catch(err => {
          throw err;
        });
    }
  },
  folders: async function(project_id) {
    if (!isOnLine) {
      const folders = getFolders(project_id);
      const folder = getFolder();
      const _view = getValue(folder, "_view", "");
      return {
        folders,
        folder,
        _view
      };
    } else {
      return await http("GET", `users/folders/${project_id}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
            return result;
          } else {
            const folders = getValue(result, "data", []);
            const folder = getVar(project_id, "folder", getItem(folders, 0));
            const _view = getValue(folder, "_view", "");
            setFolders(project_id, folders);
            setFolder(project_id, folder);
            return {
              folders,
              folder,
              _view
            };
          }
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setProfile: async function(params) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("POST", `profile`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setPassword: async function(params) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("POST", `users/password`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
