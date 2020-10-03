import { http } from "../components/http";
import { ShowAlert, getValue, join, setValue } from "../components/utilities";
import environment from "../env/env";
const apiUrl = environment.url;

export const Api = {
  project: async function(id) {
    return await http("GET", `${apiUrl}/projects/${id}`)
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
  contacts: async function(project_id, state, search, page, rows, list) {
    return await http("GET", `${apiUrl}/contacts/?project_id=${project_id}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
      .then(result => {
        if (result.msg !== "") {
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
  },
  users: async function(project_id, state, search, page, rows, list) {
    return await http("GET", `${apiUrl}/users/?project_id=${project_id}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
      .then(result => {
        if (result.msg !== "") {
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
  },
  types: async function(id, _class, state, search, page, rows, list) {
    return await http("GET", `${apiUrl}/types/?id=${id}&_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
      .then(result => {
        if (result.msg !== "") {
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
  },
  dpas: async function(id, _class, state, search, page, rows, list) {
    return await http("GET", `${apiUrl}/dpas/?id=${id}&_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
      .then(result => {
        if (result.msg !== "") {
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
  },
  getVar: async function(project_id, _var, _default) {
    return await http("GET", `${apiUrl}/projects/var/${project_id}?_var=${_var}&_default=${_default}`)
      .then(result => {
        return getValue(result, "data", _default);
      })
      .catch(err => {
        throw err;
      });
  },
  setVar: async function(project_id, _var, value) {
    return await http("POST", `${apiUrl}/projects/var/${project_id}`, { _var, value })
      .then(() => {
        return value;
      })
      .catch(err => {
        throw err;
      });
  },
  documents: async function(project_id, _class, state, search, page, rows, list) {
    return await http(
      "GET",
      `${apiUrl}/projects/documents/?project_id=${project_id}&_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`
    )
      .then(result => {
        if (result.msg !== "") {
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
  },
  modules: async function(project_id) {
    return await http("GET", `${apiUrl}/projects/modules/${project_id}`)
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
  chkModules: async function(project_id, module_id, chk) {
    return await http("POST", `${apiUrl}/projects/modules/${project_id}`, { module_id, chk })
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
  references: async function(project_id, state, search, page, rows, list) {
    return await http("GET", `${apiUrl}/references/?project_id=${project_id}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
      .then(result => {
        if (result.msg !== "") {
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
  },
  typeReferences: async function(project_id, type_id, state, search, page, rows, list) {
    return await http(
      "GET",
      `${apiUrl}/types/references/${project_id}?type_id=${type_id}&state=${state}&search=${search}&page=${page}&rows=${rows}`
    )
      .then(result => {
        if (result.msg !== "") {
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
  },
  cellars: async function(id, state, search, page, rows, list) {
    return await http("GET", `${apiUrl}/projects/cellars/${id}?state=${state}&search=${search}&page=${page}&rows=${rows}`)
      .then(result => {
        if (result.msg !== "") {
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
  },
  type: async function(id) {
    return await http("GET", `${apiUrl}/types/${id}`)
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
  dpa: async function(id) {
    return await http("GET", `${apiUrl}/dpas/${id}`)
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
  contact: async function(id, project_id) {
    return await http("GET", `${apiUrl}/contacts/${id}?project_id=${project_id}`)
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
  user: async function(id, project_id) {
    return await http("GET", `${apiUrl}/users/${id}?project_id=${project_id}`)
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
  document: async function(_class, id) {
    return await http("GET", `${apiUrl}/projects/documents/${id}?_class=${_class}`)
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
  object: async function(_class, id) {
    return await http("GET", `${apiUrl}/projects/objects/${id}?_class=${_class}`)
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
  setProject: async function(id, params) {
    return await http("POST", `${apiUrl}/projects/${id}`, params)
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
  setContact: async function(id, params) {
    return await http("POST", `${apiUrl}/contacts/${id}`, params)
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
  setWarehouse: async function(id, params) {
    return await http("POST", `${apiUrl}/warehouses/${id}`, params)
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
  setCellar: async function(id, params) {
    return await http("POST", `${apiUrl}/cellars/${id}`, params)
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
  setUser: async function(id, params) {
    return await http("POST", `${apiUrl}/users/${id}`, params)
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
  setType: async function(id, params) {
    return await http("POST", `${apiUrl}/types/${id}`, params)
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
  stateContact: async function(id, project_id, state) {
    return await http("PATCH", `${apiUrl}/contacts/${id}`, { project_id, state })
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
  stateType: async function(id, state) {
    return await http("PATCH", `${apiUrl}/types/${id}`, { state })
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
  finishUser: async function(id, project_id) {
    return await http("PATCH", `${apiUrl}/users/finish/${id}`, { project_id })
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
  finishCellar: async function(id) {
    return await http("PATCH", `${apiUrl}/cellars/${id}`, { state: "1" })
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
  upload: async function(id, project_id, _class, main_id, caption, description, filepath, user_id) {
    return await http("POST", `${apiUrl}/attachments`, {
      project_id,
      object_id: id,
      _class,
      main_id,
      caption,
      description,
      filepath,
      user_id
    })
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
  attachments: async function(id, _class, state, search, page, rows) {
    return await http("GET", `${apiUrl}/attachments/${id}?_class=${_class}&state=${state}&search=${search}&page=${page}&rows=${rows}`)
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
};
