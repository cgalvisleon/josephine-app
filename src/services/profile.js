import { http } from "../components/http";
import { ShowAlert, getValue } from "../components/utilities";
import environment from "../env/env";
const apiUrl = environment.url;

export const Api = {
  profile: async function() {
    return await http("GET", `${apiUrl}/profile`)
      .then(result => {
        if (result.msg !== "") {
          ShowAlert(result.message);
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  folders: async function(project_id) {
    return await http("GET", `${apiUrl}/users/folders/${project_id}`)
      .then(result => {
        if (result.msg !== "") {
          ShowAlert(result.message);
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  setProfile: async function(params) {
    return await http("POST", `${apiUrl}/profile`, params)
      .then(result => {
        if (result.msg !== "") {
          ShowAlert(result.message);
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  setPassword: async function(params) {
    return await http("POST", `${apiUrl}/users/password`, params)
      .then(result => {
        if (result.msg !== "") {
          ShowAlert(result.message);
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  },
  chkProfile: async function(id, project_id, profile_tp, chk) {
    return await http("PATCH", `${apiUrl}/users/chkProject/${id}`, { project_id, profile_tp, chk })
      .then(result => {
        const msg = getValue(result, "msg", "");
        if (msg !== "") {
          ShowAlert(result.message);
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  }
};
