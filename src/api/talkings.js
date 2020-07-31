import { http, isOnLine, ShowAlert, ShowOffLine, getValue, setValue, join } from "../components/utilities";

export const Api = {
  talkings: async function(id, search, page, rows, list) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `talkings/${id}?search=${search}&page=${page}&rows=${rows}`)
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
  }
};
