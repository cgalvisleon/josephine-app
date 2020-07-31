import { http, isOnLine, ShowAlert, ShowOffLine, getValue } from "../components/utilities";

export const ApiTypehead = {
  users: async function(search) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `users/typehead/${search}`)
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
  keeps: async function(project_id, collection, search) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `keep/typehead/${project_id}?collection=${collection}&search=${search}`)
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
  assets: async function(project_id, class_id, search) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `assets/typehead/${project_id}?class_id=${class_id}&search=${search}`)
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
