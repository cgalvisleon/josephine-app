import { http } from "../components/http";
import {
  isOnLine,
  ShowAlert,
  getInbox,
  setSend,
  setInbox,
  getSend,
  setState,
  delSend,
  setUserId,
  ShowOffLine,
  getValue,
  join,
  setValue
} from "../components/utilities";

export const Api = {
  project: async function(id) {
    if (!isOnLine) {
      const result = getInbox(id, "project");
      const msg = getValue(result, "msg", "");
      if (msg !== "") {
        ShowAlert(result.message);
      }
      return result;
    } else {
      return await http("GET", `projects/${id}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          }
          return setInbox(id, "project", result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  contacts: async function(id, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `contacts/?id=${id}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  users: async function(id, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `users/?id=${id}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  types: async function(id, _class, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `types/?id=${id}&_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  dpas: async function(id, _class, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `dpas/?id=${id}&_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  documents: async function(id, _class, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `projects/documents/${id}?_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  modules: async function(project_id) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `projects/modules/${project_id}`)
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
  },
  chkModules: async function(project_id, module_id, chk) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("POST", `projects/modules/${project_id}`, { module_id, chk })
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
  },
  references: async function(id, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `projects/references/${id}?state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  typeReferences: async function(id, _class, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `projects/typeReferences/${id}?_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  cellars: async function(id, state, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `projects/cellars/${id}?state=${state}&search=${search}&page=${page}&rows=${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          } else {
            let data = getValue(result, "data", {});
            let add = getValue(data, "list", []);
            list = join(list, add, "_id");
            data = setValue(data, "list", list);
            result = setValue(result, "data", data);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  type: async function(id) {
    if (!isOnLine) {
      return getSend(id);
    } else {
      return await http("GET", `types/${id}`)
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
  },
  dpa: async function(id) {
    if (!isOnLine) {
      return getSend(id);
    } else {
      return await http("GET", `dpas/${id}`)
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
  },
  contact: async function(id, project_id) {
    if (!isOnLine) {
      return getSend(id);
    } else {
      return await http("GET", `contacts/${id}?project_id=${project_id}`)
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
  },
  user: async function(id, project_id) {
    if (!isOnLine) {
      return getSend(id);
    } else {
      return await http("GET", `users/${id}?project_id=${project_id}`)
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
  },
  document: async function(_class, id) {
    if (!isOnLine) {
      return getSend(id);
    } else {
      return await http("GET", `projects/document/${id}?_class=${_class}`)
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
  },
  setProject: async function(id, params) {
    if (!isOnLine) {
      return setSend(id, params, "setProject");
    } else {
      params = setUserId(params);
      return await http("POST", `projects/${id}`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setContact: async function(id, params) {
    if (!isOnLine) {
      return setSend(id, params, "setContact");
    } else {
      params = setUserId(params);
      return await http("POST", `contacts/${id}`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setWarehouse: async function(id, params) {
    if (!isOnLine) {
      return setSend(id, params, "setWarehouse");
    } else {
      params = setUserId(params);
      return await http("POST", `warehouses/${id}`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setCellar: async function(id, params) {
    if (!isOnLine) {
      return setSend(id, params, "setCellar");
    } else {
      params = setUserId(params);
      return await http("POST", `cellars/${id}`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setUser: async function(id, params) {
    if (!isOnLine) {
      return setSend(id, params, "setUser");
    } else {
      params = setUserId(params);
      return await http("POST", `users/${id}`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  setType: async function(id, params) {
    if (!isOnLine) {
      return setSend(id, params, "setType");
    } else {
      params = setUserId(params);
      return await http("POST", `types/${id}`, params)
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  stateContact: async function(id, project_id, state) {
    if (!isOnLine) {
      return setState(id, { _id: id, project_id, state }, "stateContact");
    } else {
      return await http("PATCH", `contacts/${id}`, { project_id, state })
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  stateType: async function(id, state) {
    if (!isOnLine) {
      return setState(id, { _id: id, state }, "stateType");
    } else {
      return await http("PATCH", `types/${id}`, { state })
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  finishUser: async function(id, project_id) {
    if (!isOnLine) {
      return setState(id, { _id: id, project_id }, "finishUser");
    } else {
      return await http("PATCH", `users/finish/${id}`, { project_id })
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  finishCellar: async function(id) {
    if (!isOnLine) {
      return setState(id, { _id: id }, "finishCellar");
    } else {
      return await http("PATCH", `cellars/${id}`, { state: "1" })
        .then(result => {
          if (result.msg !== "") {
            ShowAlert(result.message);
          }
          return delSend(id, result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  upload: async function(id, project_id, _class, main_id, caption, description, filepath, user_id) {
    const params = { project_id, object_id: id, _class, main_id, caption, description, filepath, user_id };
    if (!isOnLine) {
      return setSend(id, params, "upload");
    } else {
      return await http("POST", `attachments`, params)
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
  },
  attachments: async function(id, _class, state, search, page, rows) {
    if (!isOnLine) {
      return getSend(id);
    } else {
      return await http("GET", `attachments/${id}?_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
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
  }
};
