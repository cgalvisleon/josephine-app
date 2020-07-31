import { http, isOnLine, ShowAlert, getValue, join, setValue } from "../components/utilities";
import { MSG001 } from "../components/msg";

export const Api = {
  logs: async function(search, page, rows, list) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("GET", `logs/?search=${search}&page=${page}&rows=30`)
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
    }
  },
  delete: async function(id) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("DELETE", `logs/${id}`)
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
